import axios, { AxiosError } from 'axios';
import { Response } from 'express';
import csvParser from 'csv-parser';
import fs from 'fs';
import { Pokemon, PokemonResponse } from './api.interfaces';
import { GetPokemonInfo } from './app.interfaces';

export const errorHandle = (err: unknown, res: Response): Response<any, Record<string, any>> => {
  if (axios.isAxiosError(err)) {
    const axiosError: AxiosError = err;
    if (axiosError.response) {
      const { status, data } = axiosError.response;
      return res.status(status).json({ error: data });
    }
    if (axiosError.request) {
      return res.status(500).json({ error: 'Network Error', details: axiosError.request });
    }
    return res.status(500).json({ error: 'Error Occurred', details: axiosError.message });
  }
  return res.status(500).json({ error: 'Unknow Error Occurred', details: err });
};

export const getIdFromUrl = (url: string): number | null => {
  const lastSlashIndex = url.lastIndexOf('/');
  const secondLastSlashIndex = url.lastIndexOf('/', lastSlashIndex - 1);
  if (lastSlashIndex > secondLastSlashIndex && secondLastSlashIndex !== -1) {
    const idStr = url.substring(secondLastSlashIndex + 1, lastSlashIndex);
    const id = parseInt(idStr, 10);
    return Number.isNaN(Number(id)) ? null : id;
  }
  return null;
};

export const parseCSV = (filePath: string): Promise<Record<string, string>[]> =>
  new Promise((resolve, reject) => {
    const results: Record<string, string>[] = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', data => results.push(data))
      .on('end', () => resolve(results))
      .on('error', error => reject(error));
  });

export const getDataAboutPokemon = (res: PokemonResponse): GetPokemonInfo => {
  const { name, id, height, weight, types, stats } = res;
  const { hp, attack, defense } = stats.reduce(
    (acc: object, record: { stat: { name: string }; base_stat: number }) => ({
      ...acc,
      [record.stat.name]: record.base_stat,
    }),
    {},
  );

  const data = {
    id,
    name,
    height,
    weight,
    hp,
    attack,
    defense,
    types: types.map((record: { type: { name: string } }) => record.type.name),
  };

  return data;
};

export const getMainPokemonData = (pokemon: Pokemon): { name: string; id: number } => ({
  name: pokemon.name,
  id: getIdFromUrl(pokemon.url) as number,
});

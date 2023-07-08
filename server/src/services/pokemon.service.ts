import { AxiosRequestConfig } from 'axios';
import { Request, Response } from 'express';
import { LAST_POKEMON, PAGE_LIMIT, POKEMONS_URL, TYPES_URL } from '../constants/pokeApi.constants';
import { GenericError, PokemonResponse, PokemonsResponse, TypeResponse } from '../utils/interfaces';
import {
  handleRequest,
  parseCSV,
  getDataAboutPokemon,
  getMainPokemonData,
  handleGeneralErrors,
} from '../utils/utils';

export class PokeService {
  public welcomeMessage(req: Request, res: Response): Response<any, Record<string, any>> {
    return res.status(200).send('Welcome to pokeAPI REST by Mykyta Kovalenko');
  }

  public async getPokemons(req: Request, res: Response): Promise<void> {
    await handleGeneralErrors(async () => {
      const param = req.params.page;
      const pageNum = parseInt(param, 10);

      const url = `${POKEMONS_URL}/?limit=${PAGE_LIMIT}&offset=${(pageNum - 1) * 20}`;

      const requestConfig: AxiosRequestConfig = {
        method: 'get',
        url,
      };

      const { previous, results } = await handleRequest<PokemonsResponse>(requestConfig, res);

      const pokemons = results
        .map(pokemon => getMainPokemonData(pokemon))
        .filter(pokemon => pokemon.id <= LAST_POKEMON);

      return {
        nextPage: pokemons.length < PAGE_LIMIT ? null : pageNum + 1,
        currPage: pageNum,
        prevPage: previous ? pageNum - 1 : null,
        pokemons,
      };
    }, res);
  }

  public async getPokemon(req: Request, res: Response): Promise<void> {
    await handleGeneralErrors(async () => {
      const { param } = req.params;

      const requestConfig: AxiosRequestConfig = {
        method: 'get',
        url: `${POKEMONS_URL}${param}`,
      };

      const response = await handleRequest<PokemonResponse>(requestConfig, res);

      return getDataAboutPokemon(response);
    }, res);
  }

  public async getPokemonsByType(req: Request, res: Response): Promise<void> {
    await handleGeneralErrors(async () => {
      const { type } = req.params;

      const requestConfig: AxiosRequestConfig = {
        method: 'get',
        url: `${TYPES_URL}${type}`,
      };

      const { pokemon } = await handleRequest<TypeResponse>(requestConfig, res);

      const pokemons = pokemon
        .map(({ pokemon }) => getMainPokemonData(pokemon))
        .filter(pokemon => pokemon.id <= LAST_POKEMON);

      return { pokemons };
    }, res);
  }

  public async getPokemonsUpload(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const parseResults = await parseCSV(req.file.path);

      const pokemons = parseResults.map(record => record.pokemon);

      const requests = pokemons.map(param => {
        const requestConfig: AxiosRequestConfig = {
          method: 'get',
          url: `${POKEMONS_URL}${param}`,
        };
        return handleRequest(requestConfig, res);
      });

      const results = await Promise.all(requests);

      const data = results.map(result => getDataAboutPokemon(result as PokemonResponse));

      return res.status(200).json(data);
    } catch (err) {
      const { status = 500, message } = err as GenericError;
      return res.status(status).send(message);
    }
  }
}

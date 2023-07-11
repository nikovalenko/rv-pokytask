import axios from 'axios';
import { Request, Response } from 'express';
import { LAST_POKEMON, PAGE_LIMIT, POKEMONS_URL, TYPES_URL } from '../constants/pokeApi.constants';

import { parseCSV, getDataAboutPokemon, getMainPokemonData, errorHandle } from '../utils/utils';
import { GetPokemonInfo, GetPokemonsByType, GetPokemonsResponse } from '../utils/app.interfaces';
import { PokemonResponse, PokemonsResponse, TypeResponse } from '../utils/api.interfaces';

export class PokeService {
  public welcomeMessage(req: Request, res: Response): Response<any, Record<string, any>> {
    return res.status(200).send('Welcome to pokeAPI REST by Mykyta Kovalenko');
  }

  public async getPokemons(
    req: Request,
    res: Response,
  ): Promise<GetPokemonsResponse | Response<any, Record<string, any>>> {
    try {
      const param = req.params.page;
      const pageNum = parseInt(param, 10);

      if (Number.isNaN(pageNum)) {
        return res.status(400).json({ error: 'Page number is invalid' });
      }

      const url = `${POKEMONS_URL}/?limit=${PAGE_LIMIT}&offset=${(pageNum - 1) * 20}`;

      const {
        data: { previous, results },
        status,
      } = await axios.get<PokemonsResponse>(url, {
        headers: {
          Accept: 'application/json',
        },
      });

      const pokemons = results
        .map(pokemon => getMainPokemonData(pokemon))
        .filter(pokemon => pokemon.id <= LAST_POKEMON);

      const data = {
        nextPage: pokemons.length < PAGE_LIMIT ? null : pageNum + 1,
        currPage: pageNum,
        prevPage: previous ? pageNum - 1 : null,
        pokemons,
      };

      return res.status(status).json(data);
    } catch (err) {
      return errorHandle(err, res);
    }
  }

  public async getPokemon(
    req: Request,
    res: Response,
  ): Promise<GetPokemonInfo | Response<any, Record<string, any>>> {
    try {
      const { param } = req.params;

      const url = `${POKEMONS_URL}${param}`;

      const { data } = await axios.get<PokemonResponse>(url, {
        headers: {
          Accept: 'application/json',
        },
      });

      const proccessed = getDataAboutPokemon(data);
      return res.status(200).json(proccessed);
    } catch (err) {
      return errorHandle(err, res);
    }
  }

  public async getPokemonsByType(
    req: Request,
    res: Response,
  ): Promise<GetPokemonsByType | Response<any, Record<string, any>>> {
    try {
      const { type } = req.params;

      const url = `${TYPES_URL}${type}`;

      const { data } = await axios.get<TypeResponse>(url, {
        headers: {
          Accept: 'application/json',
        },
      });

      const pokemons = data.pokemon
        .map(({ pokemon }) => getMainPokemonData(pokemon))
        .filter(pokemon => pokemon.id <= LAST_POKEMON);

      return res.status(200).json({ pokemons });
    } catch (err) {
      return errorHandle(err, res);
    }
  }

  public async getPokemonsUpload(
    req: Request,
    res: Response,
  ): Promise<GetPokemonInfo[] | Response<any, Record<string, any>>> {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const parseResults = await parseCSV(req.file.path);

      const pokemons: string[] = parseResults.map(record => record.pokemon);

      const requests = pokemons.map(param => {
        const url = `${POKEMONS_URL}${param}`;

        const request = axios.get<PokemonResponse>(url, {
          headers: {
            Accept: 'application/json',
          },
        });

        return request;
      });

      const results = await Promise.all(requests);

      const data = results.map(result => getDataAboutPokemon(result.data as PokemonResponse));

      return res.status(200).json(data);
    } catch (err) {
      return errorHandle(err, res);
    }
  }
}

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Response } from 'express'
import csvParser from 'csv-parser'
import fs from 'fs'
import { GenericError, Pokemon, PokemonInfo, PokemonResponse } from './interfaces'

export async function handleRequest<T>(
  requestConfig: AxiosRequestConfig,
  res: Response,
): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios(requestConfig)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error
      if (axiosError.response) {
        const { status, data } = axiosError.response
        res.status(status).json({ error: data })
      } else if (axiosError.request) {
        res.status(500).json({ error: 'Network Error', details: axiosError.request })
      } else {
        res.status(500).json({ error: 'Error Occurred', details: axiosError.message })
      }
    } else {
      res.status(500).json({ error: 'Error Occurred', details: error })
    }
    throw error
  }
}

export function getIdFromUrl(url: string): number | null {
  const lastSlashIndex = url.lastIndexOf('/')
  const secondLastSlashIndex = url.lastIndexOf('/', lastSlashIndex - 1)
  if (lastSlashIndex > secondLastSlashIndex && secondLastSlashIndex !== -1) {
    const idStr = url.substring(secondLastSlashIndex + 1, lastSlashIndex)
    const id = parseInt(idStr, 10)
    return isNaN(id) ? null : id
  }
  return null
}

export const parseCSV = (filePath: string): Promise<any[]> =>
  new Promise((resolve, reject) => {
    const results: string[] = []

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', data => results.push(data))
      .on('end', () => resolve(results))
      .on('error', error => reject(error))
  })

export const getDataAboutPokemon = (res: PokemonResponse): PokemonInfo => {
  const { name, id, height, weight, types, stats } = res
  const { hp, attack, defense } = stats.reduce(
    (acc: object, record: { stat: { name: string }; base_stat: number }) => ({
      ...acc,
      [record.stat.name]: record.base_stat,
    }),
    {},
  )

  const data = {
    id,
    name,
    height,
    weight,
    hp,
    attack,
    defense,
    types: types.map((record: { type: { name: string } }) => record.type.name),
  }

  return data
}

export const getMainPokemonData = (pokemon: Pokemon): { name: string; id: number } => ({
  name: pokemon.name,
  id: getIdFromUrl(pokemon.url) as number,
})

export const handleGeneralErrors = async (
  callback: () => object,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const data = await callback()
    return res.status(200).json(data)
  } catch (err) {
    const { status = 500, message } = err as GenericError
    return res.status(status).send(message)
  }
}

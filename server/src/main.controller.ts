import { Application } from 'express'
import { PokeService } from './services/pokemon.service'
import { AuthService } from './services/auth.service'
import { authMiddleware } from './utils/middleware'

export class Controller {
  private pokeService: PokeService

  private authService: AuthService

  constructor(private app: Application) {
    this.pokeService = new PokeService()
    this.authService = new AuthService()
    this.routes()
  }

  public routes(): void {
    this.app.route('/').get(this.pokeService.welcomeMessage)
    this.app.route('/api/pokemons/:page').get(this.pokeService.getPokemons)
    this.app.route('/api/pokemon/:param([0-9]+|[a-zA-Z]+)').get(this.pokeService.getPokemon)
    this.app.route('/api/type/:type').get(this.pokeService.getPokemonsByType)
    this.app.route('/api/pokemons/upload').post(authMiddleware, this.pokeService.getPokemonsUpload)
    this.app.route('/api/login').post(this.authService.login)
    this.app.route('/api/register').post(this.authService.register)
  }
}

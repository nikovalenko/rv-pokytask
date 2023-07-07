import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User'

export class AuthService {
  public welcomeMessage(req: Request, res: Response): Response<any, Record<string, any>> {
    return res.status(200).send('Welcome to pokeAPI REST by Mykyta Kovalenko')
  }

  public async login(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const { email, password } = req.body

      // Find the user by email
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' })
      }

      // Generate and return a JWT token
      const token = jwt.sign({ userId: user._id }, 'secret_key')
      res.status(200).json({ token })
    } catch (error) {
      console.error('Login error:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  public async register(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const { name, email, password } = req.body
      // Check if the user already exists
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' })
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      // Create a new user
      const newUser = new User({
        username: name,
        email,
        password: hashedPassword,
      })

      await newUser.save()
      res.status(200).json({ message: 'User registered successfully' })
    } catch (error) {
      console.error('Registration error:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}

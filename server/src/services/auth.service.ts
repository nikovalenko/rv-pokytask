import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { JWT_SECRET, SALT } from '../constants/pokeApi.constants';

export class AuthService {
  public welcomeMessage(req: Request, res: Response): Response<any, Record<string, any>> {
    return res.status(200).send('Welcome to pokeAPI REST by Mykyta Kovalenko');
  }

  public async login(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET);
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async register(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, SALT);

      const newUser = new User({
        username: name,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      return res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../constants/pokeApi.constants'

interface RequestWithUser extends Request {
  user?: string | jwt.JwtPayload;
}

export function authMiddleware(req: RequestWithUser, res: Response, next: NextFunction): void {
  const token =
    req.headers.authorization?.replace('Bearer ', '') || req.query.token || req.cookies.token

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

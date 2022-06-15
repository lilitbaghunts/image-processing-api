import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { getUser } from '../services/user'
const { ERRORS } = require('../common/params.json')
const { ACCESS_TOKEN_SECRET } = process.env

const checkToken = (token: string, cb: any) => {
    jwt.verify(token, ACCESS_TOKEN_SECRET as string, {}, async (err: any, decoded: any) => {
      if (err) return cb(err, null)

      const user = await getUser(decoded.email)
      if (!user) return cb({ noUser: true }, null)
      return cb(null, { decoded, user })
    })
  }

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['token']
    if (!token) return res.status(401).send(ERRORS.NO_TOKEN)

    checkToken(token as string, (err: any, data: any) => {
        if (err) return res.status(401).send(ERRORS.INVALID_TOKEN)    

        req.user = {
          email: data.user._doc.email,
          role: data.user._doc.role,
          refreshTokens: data.user._doc.refreshTokens
        }
        next()
    })
}
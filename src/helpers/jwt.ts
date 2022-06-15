import jwt from 'jsonwebtoken'
const { getUser, updateUserTokens } = require('../services/user')
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env
const { ERRORS } = require('../common/params.json')


export const generateTokens = (user: any) => {
    const accessToken = jwt.sign({ 
        email: user?.email, 
        role: user?.role
    }, ACCESS_TOKEN_SECRET as string, {
        expiresIn: '1 min'
    })
    const refreshToken = jwt.sign({ 
        email: user?.email, 
        role: user?.role
    }, REFRESH_TOKEN_SECRET as string)

    return {
        accessToken,
        refreshToken
    }
}


export const getNewTokens = (token: string, cb: any) => {
    jwt.verify(token, REFRESH_TOKEN_SECRET as string, async (err: any, decoded: any) => {
      if (err) return cb(err, null)
      const user = await getUser(decoded.email)
      if (user?.refreshTokens.includes(token)) {
        return cb(ERRORS.INVALID_REFRESH_TOKEN, null)
      }
      const { accessToken, refreshToken } = generateTokens(decoded)
      await updateUserTokens(user.email, token)
    
      cb(null, { accessToken, refreshToken })
    })
  }
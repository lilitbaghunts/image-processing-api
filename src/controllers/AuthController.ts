import { Request, Response } from 'express';
import { Controller, Middleware, Get, Post, Put, Delete } from '@overnightjs/core';
import { verifyToken, isAdmin, googleAuth } from '../middlewares'
import { getNewTokens, generateTokens } from '../helpers/jwt'


@Controller('api')
export default class AuthController {

    @Get('login')
    private async login (req: Request, res: Response) {
        res.send('<a href="login/google">Login with google</a>')
    }

    @Get('login/google')
    @Middleware(googleAuth)
    private async loginGoogle (req: Request, res: Response) {}

    @Get('google/callback')
    @Middleware(googleAuth)
    private async googleCallback (req: any, res: Response) {
        const { accessToken, refreshToken } = generateTokens(req.user)
        res.cookie('auth', req.refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' })
        res.json( {
            accessToken,
            refreshToken
        }).status(200)
    }

    @Get('admin')
    @Middleware([verifyToken, isAdmin])
    private async getAdmin (req: Request, res: Response) {
        res.send('admin check').status(200)
    }

    @Get('token/:refresh_token?')
    private async getRefreshToken (req: Request, res: Response) {
        const refreshToken: any = req.cookies.auth || req.query['refresh_token'] || req.params['refresh_token']
        getNewTokens(refreshToken, (err: any, tokens: { accessToken: string, refreshToken: string}) => {
            if (err) res.status(403).json({ error: err })
            res.cookie('auth', tokens.refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' })
            res.status(200).json(tokens)
        })
    }

    @Delete('logout')
    @Middleware(verifyToken)
    private logout (req: any, res: Response) {
        req.user = null
        res.cookie('auth', '', { maxAge: 1 })
        res.status(204)

        /*
        res.cookie('access_token', '', { maxAge: 1 })
        res.cookie('logged_in', '', {
            maxAge: 1,
        })
        */
    }

} 
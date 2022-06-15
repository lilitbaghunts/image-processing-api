const { NODE_ENV, DB_NAME, PORT, SESSION_SECRET, MONGODB_URL } = process.env
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import session from 'express-session'
import mongoose from 'mongoose'
require('./helpers/googleSSO')
require('./models/user')

import { Server } from '@overnightjs/core'
import AuthController from './controllers/AuthController';

  export class AppServer extends Server {

    constructor() {
        super(NODE_ENV === 'development') // setting showLogs to true
        this.applyMiddleWares()
        this.setupControllers()
    }

    private setupControllers(): void {
        const authController = new AuthController()
        super.addControllers(
            [authController]
        )
    }

    private applyMiddleWares() {

        this.app.use(cors(/*{ credentials: true, origin: true }*/))
        this.app.use(express.json())
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(cookieParser())
        /*
        Session based authentication usecase
        this.app.use(passport.initialize())
        this.app.use(passport.session())
        */

        const memoryStore = new session.MemoryStore()
        this.app.use(session({
            secret: SESSION_SECRET as string,
            resave: false,
            saveUninitialized: true,
            store: memoryStore,
            cookie: {
              maxAge: 360000,
              secure: false
            }
          }
        ))
      }

    public start(): void {
        const port = PORT || 3000

        // Connect to MongoDB database
        mongoose
          .connect(`${MONGODB_URL}/${DB_NAME}`)
          .then(() => {
            this.app.get('/', (req, res) => {
                res.redirect('/login')
            })

            this.app.listen(port, () => {
              console.log(`App started on port ${port}`)
            })
          })
    }
}
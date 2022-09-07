const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const errorHandler = require('./src/middleware/errorHandler')
dotenv.config()

const app = express()
app.use(bodyParser.json())
app.use('/uploads', express.static(process.cwd() + '/uploads'))

app.set('views', 'views');
app.set('view engine', 'ejs');

const { productRoutes, storeRoutes } = require('./src/routes')

app.use('/', productRoutes)
app.use('/', storeRoutes)
app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`)
})

module.exports = app

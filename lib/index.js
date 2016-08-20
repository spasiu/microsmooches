import 'babel-core/register'
import 'babel-polyfill'

import morgan from 'morgan'
import helmet from 'helmet'
import express from 'express'
import cluster from 'express-cluster'
import bodyParser from 'body-parser'
import testController from './controllers/test'

const port = process.env.PORT || 8000
const count = process.env.WEB_CONCURRENCY || 2

cluster({ count }, () => {
    const app = express()

    // logging with morgan
    app.use(morgan('combined'))

    // securing Express with helmet
    app.use(helmet())

    app.use(bodyParser.json())

    app.get('/', async function(req, res, next) {
        try {
            res.end(await testController.get())
        } catch(e) {
            next(e)
        }
    })

    app.get('/error', async function(req, res, next) {
        try {
            res.end(await testController.getError())
        } catch(e) {
            next(e)
        }
    })

    app.use((err, req, res, next) => {
        res.status(typeof err === 'number' ? err : 500)
            .send(err && err.message)
    })

    return app.listen(port)
})

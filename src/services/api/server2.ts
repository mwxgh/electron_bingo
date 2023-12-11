import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import logger from 'morgan'

// Creates and configures an ExpressJS web server2.
class ExpressApp {
  // ref to Express instance
  public express: express.Application

  // Run configuration methods on the Express instance.
  constructor() {
    this.express = express()
    this.middleware()
    this.routes()

    this.express.set('port', process.env.PORT || 3000)
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'))
    this.express.use(cors())
    // this.express.use('/images', express.static(path.join(__dirname, 'public/images')));
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: false }))
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    const router = express.Router()
    this.express.use('/', router)
  }
}

export default new ExpressApp().express

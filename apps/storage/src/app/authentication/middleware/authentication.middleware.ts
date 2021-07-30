import express from 'express'

import debug from 'debug'

const log: debug.IDebugger = debug('app:authentication-middleware')
class AuthenticationMiddleware {
  async checkAuthHeader(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.header('authorization')) {
      next()
    } else {
      log(`Authorization header was not received.`)
      res.status(401).send({ error: `Not authenticated` })
    }
  }

  async checkTokenParameter(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.query.token) {
      log(req.query)
      next()
    } else {
      log(req.query)
      log(`Authorization URL token was not received.`)
      res.status(401).send({
        errors: [
          {
            message: `Not authorized.`,
            path: req.path,
          },
        ],
      })
    }
  }

  async checkBearerToken(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.header('authorization').split(' ')[0] === 'Bearer') {
      next()
    } else {
      log(
        `Invalid authentication header. Received ${req.header(
          'authorization'
        )}.`
      )
      res.status(401).send({ error: `Invalid Authentication Header` })
    }
  }
}

export default new AuthenticationMiddleware()

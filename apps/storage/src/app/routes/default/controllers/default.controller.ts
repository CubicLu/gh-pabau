import express from 'express'
import debug from 'debug'

const log: debug.IDebugger = debug('app:default-controller')
class DefaultController {
  async returnDefaultResponse(req: express.Request, res: express.Response) {
    const ip = req.header('x-forwarded-for') || req.socket.remoteAddress
    log(`${req.method} Request Received from ${ip}`)
    if (req.method === 'POST') {
      res.status(404).send({
        errors: [
          {
            message: `${req.path} endpoint does not exist.`,
            path: req.path,
          },
        ],
      })
    } else if (req.method === 'GET') {
      res.status(404).send({
        errors: [
          {
            message: `${req.path} endpoint does not exist.`,
            path: req.path,
          },
        ],
      })
    } else {
      res.status(405).send({
        errors: [
          {
            message: `${req.method} not allowed`,
            path: req.path,
          },
        ],
      })
    }
  }
}

export default new DefaultController()

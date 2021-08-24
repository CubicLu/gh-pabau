import express from 'express'
import debug from 'debug'
import AuthenticationService from '../services/authentication.service'
import ValidationController from '../controllers/validation.controller'
import CommonHelper from '../../helpers/common/common.helper'

const log: debug.IDebugger = debug('app:authentication-controller')
class AuthenticationController {
  async returnDefaultResponse(req: express.Request, res: express.Response) {
    const ip = req.header('x-forwarded-for') || req.socket.remoteAddress
    log(`${req.method} Request Received from ${ip}`)

    res.status(405).send({ error: 'Method not allowed' })
  }
  async checkJwt(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const bearerToken: string = req.header('authorization').split(' ')[1]

    const payloadData = await AuthenticationService.checkJwt(bearerToken)

    if (payloadData['errors']) {
      res.status(405).send({ error: 'Invalid token' })
    } else {
      log(`INFO: PayloadData: ${JSON.stringify(payloadData)}`)
      const missingData = await ValidationController.checkRequiredData(
        payloadData
      )
      if (missingData.length > 0) {
        CommonHelper.returnErrorResponse(
          req,
          res,
          400,
          'ERROR: Missing Parameters',
          missingData
        )
      }

      req.query = {} // Unset All query variables

      // Store all payload data into req.query
      Object.keys(payloadData).map(async (index) => {
        req.query[index] = payloadData[index]
      })
      log(req.query)
      next()
    }
  }

  async checkJwtDownload(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const jwtToken = req.query.token

    const payloadData = await AuthenticationService.checkJwtDownload(jwtToken)

    if (payloadData['errors']) {
      res.status(401).send({
        errors: [
          {
            message: `Not authorized.`,
            path: req.path,
          },
        ],
      })
    } else {
      log(`INFO: PayloadData: ${JSON.stringify(payloadData)}`)
      next()
    }
  }
}

export default new AuthenticationController()

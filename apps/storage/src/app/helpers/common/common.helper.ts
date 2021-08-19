import express from 'express'

class CommonHelper {
  async returnErrorResponse(
    req: express.Request,
    res: express.Response,
    code: number,
    message: string,
    data: string[]
  ) {
    res.status(code).send({ errors: { message: message, data: data } })
  }

  async returnSuccessResponse(
    req: express.Request,
    res: express.Response,
    data: Record<string, unknown>
  ) {
    res.status(200).send({ data: data })
  }
}

export default new CommonHelper()

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import bodyParser from 'body-parser'
import cors from 'cors'
import { AppController } from './app/app.controller'
import { AppModule } from './app/app.module'

const limit = '150mb'
console.log('Starting NestJS', { limit })

async function bootstrapDevServer() {
  const app = await NestFactory.create(AppModule)
  // const globalPrefix = 'api'
  // app.setGlobalPrefix(globalPrefix)

  app.use(cors())
  app.use(bodyParser.json({ limit }))
  app.use(bodyParser.urlencoded({ limit, extended: true }))
  const port = process.env.PORT || 3333
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/')
  })
}

if (!process.env.VERCEL) {
  console.log('STARTING SERVER')
  bootstrapDevServer()
}

function invokeNest(req: VercelRequest, res: VercelResponse) {
  NestFactory.create(AppModule).then(async (e) => {
    const app2 = e.get(AppController)
    res.json(await app2.getData())
  })
}

export default function (req: VercelRequest, res: VercelResponse) {
  invokeNest(req, res)
}

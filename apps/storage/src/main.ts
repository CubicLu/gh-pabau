import express from 'express'
import * as http from 'http'
import * as bodyparser from 'body-parser'
import cors from 'cors'
import { RoutesConfig } from './app/routes/routes.config'
import { Authentication } from './app/authentication/authentication.config'
import { DeleteRoutes } from './app/routes/delete/delete.routes.config'
import { UploadRoutes } from './app/routes/upload/upload.routes.config'
import { DownloadRoutes } from './app/routes/download/download.routes.config'
import { DefaultRoutes } from './app/routes/default/default.routes.config'

import debug from 'debug'

const app: express.Application = express()
const server: http.Server = http.createServer(app)
const port = 3030
const routes: Array<RoutesConfig> = []
const debugLog: debug.IDebugger = debug('app')

app.disable('x-powered-by')
app.use(bodyparser.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

routes.push(
  new Authentication(app),
  new UploadRoutes(app),
  new DownloadRoutes(app),
  new DeleteRoutes(app),
  new DefaultRoutes(app)
)

server.listen(port, () => {
  debugLog(`Server running at http://localhost:${port}`)
  for (const route of routes) {
    debugLog(`Routes configured for ${route.getName()}`)
  }
})

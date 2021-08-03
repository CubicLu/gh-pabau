import express from 'express'
export abstract class RoutesConfig {
  app: express.Application
  name: string

  constructor(app: express.Application, name: string) {
    this.app = app
    this.name = name
    this.setRoutes()
  }
  getName() {
    return this.name
  }
  abstract setRoutes(): express.Application
}

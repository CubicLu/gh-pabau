import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { PubSub } from 'apollo-server'

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  req: Request
  res: Response
  pubSub: PubSub
}

export const createContext = (req: Request) => ({
  ...req,
  PubSub,
  prisma,
})

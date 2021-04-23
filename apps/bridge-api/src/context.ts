import { PrismaClient } from '@prisma/client'
import { PubSub } from 'apollo-server'
import { Request, Response } from 'express'

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

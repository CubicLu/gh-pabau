import { PrismaClient } from '@prisma/client'
import { SchemaLink } from '@apollo/client/link/schema'
import { Request, Response } from 'express'
import { PubSub } from 'apollo-server'
import { Operation } from '@apollo/client'
import { Cookies } from 'react-cookie'
import ResolverContextFunction = SchemaLink.ResolverContextFunction

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  req: Request
  res: Response
  cookie: Cookies
  pubSub: PubSub
}

export const createContext: ResolverContextFunction = (req: Operation) => ({
  ...req,
  PubSub,
  prisma,
})

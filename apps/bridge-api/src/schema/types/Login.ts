import { extendType, intArg, nonNull, stringArg } from 'nexus'

import { Context } from '../../context'
import {
  verifyUser,
  authenticateUser,
} from '../../app/authentication/login-service'

export const VerifyCredentials = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('VerifyCredentials', {
      type: 'User',
      description:
        'First step of authentication flow - we verify the user credentials',
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
        company_id: intArg(),
      },
      async resolve(event, args, ctx: Context) {
        let users = []
        try {
          users = await ctx.prisma.user.findMany({
            where: {
              username: {
                equals: args.username,
              },
            },
            include: {
              Company: true,
            },
          })
        } catch (error) {
          throw new Error(error)
        }

        return verifyUser(users, args)
      },
    })
  },
})

export const ListRelatedCompanies = extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('ListRelatedCompanies', {
      type: 'User',
      args: {
        username: nonNull(stringArg()),
      },
      async resolve(event, args, ctx: Context) {
        try {
          return await ctx.prisma.user.findMany({
            where: {
              username: {
                equals: args.username,
              },
            },
            include: {
              Company: true,
            },
          })
        } catch (error) {
          throw new Error(error)
        }
      },
    })
  },
})

export const AuthenticateUser = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('AuthenticateUser', {
      type: 'String',
      args: {
        user_id: nonNull(intArg()),
        username: nonNull(stringArg()),
        company_id: nonNull(intArg()),
        user_admin: nonNull(intArg()),
        company_admin: nonNull(intArg()),
        remote_url: stringArg(),
        remote_connect: stringArg(),
      },
      async resolve(event, args, ctx: Context) {
        return authenticateUser({
          id: args.user_id,
          username: args.username,
          company_id: args.company_id,
          admin: args.user_admin,
          company: {
            admin: args.company_admin,
            remote_url: args.remote_url,
            remote_connect: args.remote_connect,
          },
        })
      },
    })
  },
})

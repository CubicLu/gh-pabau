import { extendType, intArg, nonNull, stringArg } from 'nexus'

import { Context } from '../../context'
import {
  verifyUser,
  authenticateUser,
  generateLegacyJWT,
} from '../../app/authentication/login-service'
import { PrismaClient } from '@prisma/client'

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
              Company: {
                select: {
                  remote_url: true,
                  remote_connect: true,
                },
              },
              CompanyDetails: {
                select: {
                  admin: true,
                  enable_2fa: true,
                },
              },
              CmStaffGeneral: {
                select: {
                  CellPhone: true,
                },
              },
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
          const data = await ctx.prismaArray(undefined).user.findMany({
            where: {
              username: {
                equals: args.username,
              },
            },
            include: {
              Company: true,
              CompanyDetails: {
                select: {
                  company_name: true,
                },
              },
            },
          })
          for (const row of data) {
            // Overwrite each row with the correct user id
            row.id = (
              await ctx.prismaArray(row.Company.remote_url).user.findFirst({
                where: {
                  username: row.username,
                  company_id: row.Company.id,
                },
                select: {
                  id: true,
                },
              })
            ).id
          }
          return data
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

export const changeCompany = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('changeCompany', {
      type: 'String',
      args: {
        user_id: nonNull(intArg()),
        company_id: nonNull(intArg()),
      },
      async resolve(event, args, ctx: Context) {
        return generateLegacyJWT(args)
      },
    })
  },
})

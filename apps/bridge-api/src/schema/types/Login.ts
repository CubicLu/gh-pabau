import { extendType, intArg, nonNull, stringArg } from 'nexus'

import { Context } from '../../context'
import LoginService from '../../app/authentication/LoginService'

export const VerifyCredentials = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('VerifyCredentials', {
      type: 'User',
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
        company_id: intArg(),
      },
      async resolve(event, args, ctx: Context) {
        const loginService = new LoginService(ctx)
        const users = await loginService.findUsers({
          username: args.username,
          password: args.password,
        })

        if (users.length > 0 && args.company_id) {
          return loginService.verifyWithCompanyId(users, args.company_id, args)
        }

        return loginService.verify(users, args)
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
        const loginService = new LoginService(ctx)
        return await loginService.findUsers({
          username: args.username,
          password: null,
        })
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
        company_id: nonNull(intArg()),
        user_admin: nonNull(intArg()),
        company_admin: nonNull(intArg()),
        remote_url: stringArg(),
        remote_connect: stringArg(),
      },
      async resolve(event, args, ctx: Context) {
        const loginService = new LoginService(ctx)
        return loginService.authenticateUser({
          id: args.user_id,
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

import { extendType, nonNull, stringArg } from 'nexus'
import AuthenticationService from '../../app/authentication/AuthenticationService'
import { Context } from '../../context'
import { LoginInputDto } from '../../app/authentication/dto'

export const Authentication = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('login', {
      type: 'String',
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_root, args: LoginInputDto, ctx: Context) {
        const { username, password } = args
        if (!username || !password) {
          throw new Error('Malformed Parameters')
        }
        return new AuthenticationService(ctx).handleLoginRequest(args)
      },
    })
    t.field('logout', {
      type: 'Boolean',
      args: {},
      resolve() {
        return true
      },
    })
  },
})

export const Me = extendType({
  type: 'Query',
  definition(t) {
    t.field('me', {
      type: 'User',
      resolve(_root, _args, ctx: Context) {
        return ctx.prisma.user.findUnique({
          where: {
            id: ctx.authenticated.user,
          },
        })
      },
    })
  },
})

export const Company = extendType({
  type: 'Query',
  definition(t) {
    t.field('company', {
      type: 'Company',
      resolve(_root, _args, ctx: Context) {
        return ctx.prisma.company.findUnique({
          where: {
            id: ctx.authenticated.company,
          },
        })
      },
    })
  },
})

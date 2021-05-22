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
      async resolve(_, loginInput: LoginInputDto, ctx: Context) {
        if (!loginInput.username || !loginInput.password) {
          throw new Error('Malformed Parameters')
        }
        return await new AuthenticationService(ctx).handleLoginRequest(
          loginInput
        )
      },
    })
    t.field('logout', {
      type: 'Boolean',
      args: {},
      async resolve(_, __) {
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
      async resolve(_root, _args, ctx) {
        return ctx.prisma.user.findUnique({
          where: {
            id: ctx.user.user,
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
      async resolve(_root, _args, ctx) {
        return ctx.prisma.company.findUnique({
          where: {
            id: ctx.user.company,
          },
        })
      },
    })
  },
})

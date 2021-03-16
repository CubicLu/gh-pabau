import { extendType, nonNull, stringArg } from 'nexus'
import { AuthenticationService } from '../../app/authentication/AuthenticationService'
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
        try {
          const token = await new AuthenticationService(ctx).handleLoginRequest(
            loginInput
          )
          ctx.req.session = {
            jwt: token,
          }
          return token
        } catch (error) {
          console.error(error)
          throw new Error('Unauthorized access')
        }
      },
    })

    t.field('logout', {
      type: 'Boolean',
      args: {},
      async resolve(_, __, ctx: Context) {
        ctx.req.session = null
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
        return (ctx as Context).prisma.user.findUnique({
          where: {
            id: ctx.req.authenticatedUser.user,
          },
        })
      },
    })
  },
})

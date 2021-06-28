import { extendType, nonNull, stringArg } from 'nexus'
import AuthenticationService from '../../app/authentication/AuthenticationService'
import {
  ChangePasswordInputDto,
  LoginInputDto,
} from '../../app/authentication/dto'
import EmailService from '../../app/email/EmailService'
import { Context } from '../../context'

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
        const authService = new AuthenticationService(ctx)
        return authService.handleLoginRequest(args)
      },
    })
    t.field('logout', {
      type: 'Boolean',
      args: {},
      resolve() {
        return true
      },
    })
    t.field('updateUserPassword', {
      type: 'Boolean',
      description: 'Updates the current user password',
      args: {
        currentPassword: nonNull(stringArg()),
        newPassword: nonNull(stringArg()),
      },
      async resolve(_, args: ChangePasswordInputDto, ctx: Context) {
        const { currentPassword, newPassword } = args
        if (!currentPassword || !newPassword) {
          throw new Error('Malformed Parameters')
        }
        const response = await new AuthenticationService(
          ctx
        ).handlePasswordChange(args)
        if (response) {
          await new EmailService().sendEmail({
            templateType: 'password-reset-confirm',
            to: response?.username,
            name: response?.full_name,
            subject: 'Password Changed Confirmation',
          })
          return true
        }
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

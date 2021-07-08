import { extendType, nonNull, stringArg } from 'nexus'
import AuthenticationService from '../../app/authentication/AuthenticationService'
import {
  LoginInputDto,
  ResetPasswordInputDto,
  ChangePasswordInputDto,
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
    t.field('resetPassword', {
      type: 'Boolean',
      args: {
        token: nonNull(stringArg()),
        newPassword: nonNull(stringArg()),
      },
      async resolve(_, input: ResetPasswordInputDto, ctx) {
        if (input.token === null || input.newPassword === null) {
          throw new Error('Malformed Parameters')
        }
        const authService = new AuthenticationService(ctx)
        const username = await authService.encryptDecryptText(
          'decryption',
          input.token
        )
        const response = await authService.forgotPasswordGenerator({
          token: username,
          newPassword: input.newPassword,
        })
        if (response) {
          const user = await ctx.prisma.user.findFirst({
            where: {
              username: username,
            },
          })
          await new EmailService().sendEmail({
            templateType: 'password-reset-confirm',
            to: user?.username,
            subject: 'Password Changed Confirmation',
            fields: [
              {
                key: 'name',
                value: user?.full_name,
              },
            ],
          })
        }
        return response
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
            subject: 'Password Changed Confirmation',
            fields: [
              {
                key: 'name',
                value: response?.full_name,
              },
            ],
          })
          return true
        }
      },
    })
  },
})
export const isUser = extendType({
  type: 'Query',
  definition(t) {
    t.field('validateUser', {
      type: 'String',
      args: {
        username: nonNull(stringArg()),
      },
      async resolve(_, loginInput: LoginInputDto, ctx) {
        if (loginInput.username === null) {
          throw new Error('Malformed Parameters')
        }
        const valideUser = ctx.prisma.user
          .findFirst({
            where: {
              email: loginInput.username,
            },
          })
          .then((res) => {
            if (res.username === null) {
              throw new Error('Invalid User')
            }
            return new AuthenticationService(ctx).encryptDecryptText(
              'encryption',
              res.username
            )
          })
        return valideUser
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

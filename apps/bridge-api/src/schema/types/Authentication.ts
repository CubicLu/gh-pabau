import { extendType, nonNull, stringArg } from 'nexus'
import AuthenticationService from '../../app/authentication/authentication-service'
import {
  ChangePasswordInputDto,
  LoginInputDto,
  ResetPasswordInputDto,
} from '../../app/authentication/dto'
import EmailService from '../../app/email/email-service'
import { Context } from '../../context'
import { PrismaSelect } from '@paljs/plugins'

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
              {
                key: 'url',
                value:
                  typeof window !== 'undefined'
                    ? `${window?.location?.origin}/`
                    : '',
              },
              {
                key: 'userEmail',
                value: user?.username,
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
export const Me = extendType({
  type: 'Query',
  definition(t) {
    t.field('me', {
      type: 'User',
      resolve(_root, _args, ctx: Context, info) {
        const select = new PrismaSelect(info).value
        return ctx.prisma.user.findUnique({
          where: {
            id: ctx.authenticated.user,
          },
          ...select,
        })
      },
    })
    t.field('company', {
      type: 'Company',
      resolve(_root, _args, ctx: Context, info) {
        const select = new PrismaSelect(info).value
        return ctx.prisma.company.findUnique({
          where: {
            id: ctx.authenticated.company,
          },
          ...select,
        })
      },
    })
    t.field('validateUser', {
      type: 'String',
      args: {
        username: nonNull(stringArg()),
      },
      async resolve(_, loginInput: LoginInputDto, ctx) {
        if (loginInput.username === null) {
          throw new Error('Malformed Parameters')
        }
        return ctx.prisma.user
          .findFirst({
            where: {
              email: loginInput.username,
            },
          })
          .then(async (res) => {
            if (res.username === null) {
              throw new Error('Invalid User')
            }
            const token = await new AuthenticationService(
              ctx
            ).encryptDecryptText('encryption', res.username)
            if (token) {
              await ctx.prisma.passwordResetAuth.upsert({
                where: { username: loginInput?.username },
                create: {
                  username: loginInput?.username,
                  key_code: token,
                  date: new Date().toISOString(),
                  old_password: res.password,
                },
                update: {
                  username: { set: loginInput?.username },
                  key_code: { set: token },
                  date: { set: new Date().toISOString() },
                },
              })
              return token
            }
          })
      },
    })
    t.field('permission', {
      type: 'UserPermission',
      description: 'Validates can a user access a page',
      args: {
        page: nonNull(stringArg()),
      },
      resolve(_, { page }, ctx: Context) {
        return ctx.prisma.userPermission
          .findFirst({
            where: {
              user: {
                equals: ctx.authenticated.user,
              },
              Page: {
                name: {
                  equals: page,
                },
              },
            },
          })
          .then((data) => {
            if (data?.user !== ctx.authenticated.user) {
              throw new Error('Not Authorized')
            }
            return data
          })
      },
    })
  },
})

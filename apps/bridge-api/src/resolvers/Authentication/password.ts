import { extendType, nonNull, stringArg } from 'nexus'
import { sendEmail } from '../../app/email/email-service'
import { Context } from '../../context'
import { v4 as uuidv4 } from 'uuid'
import { validatePassword } from '@pabau/yup'
import { createHash } from 'crypto'

export const createPabau1PasswordHash = (password: string, salt?: string) =>
  salt
    ? createHash('sha1').update(`${salt}${password}${salt}`).digest('hex')
    : createHash('md5').update(`${password}`).digest('hex')

export const Password = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('changePassword', {
      type: 'Boolean',
      description: 'Updates the current user password',
      args: {
        currentPassword: nonNull(stringArg()),
        newPassword: nonNull(stringArg()),
      },
      async resolve(
        _root,
        { newPassword, currentPassword },
        { prisma, authenticated: { user, company } }: Context
      ) {
        // Get email of user from current pod
        const {
          username,
          full_name,
          password,
          salt,
        } = await prisma.user.findFirst({
          rejectOnNotFound: true,
          where: { id: user, company_id: { equals: company } },
          select: {
            username: true,
            full_name: true,
            password: true,
            salt: true,
          },
        })

        if (createPabau1PasswordHash(currentPassword, salt) === password) {
          await prisma.user.updateMany({
            where: {
              username: username,
            },
            data: {
              password: createPabau1PasswordHash(newPassword, salt),
              password_algor: 2,
            },
          })

          // As a security measure, we send an email to the username (an email address) to tell them their password was changed
          await sendEmail({
            templateType: 'password-reset-confirm',
            to: username,
            subject: 'Password Changed Confirmation',
            fields: [
              {
                key: 'name',
                value: full_name,
              },
            ],
          })
          return true
        } else {
          throw new Error('Old password not matched!')
        }
        return false
      },
    })

    t.field('resetPassword', {
      type: 'Boolean',
      description:
        'Changes the password for the user based on a token received over email',
      args: {
        token: nonNull(stringArg()),
        newPassword1: nonNull(stringArg()),
        newPassword2: nonNull(stringArg()),
      },
      async resolve(
        _root,
        { token, newPassword1, newPassword2 },
        { prisma, authenticated }: Context
      ) {
        if (newPassword1 !== newPassword2)
          throw new Error(`Password confirmation doesn't match Password`)
        if (!(await validatePassword.isValid(newPassword1)))
          throw new Error('Choose a stronger password')

        const user = await prisma.passwordResetAuth.findFirst({
          rejectOnNotFound: true,
          where: {
            key_code: { equals: token },
          },
          select: {
            User: {
              select: {
                id: true,
              },
            },
          },
        })

        const { salt, username, full_name } = await prisma.user.findUnique({
          rejectOnNotFound: true,
          where: {
            id: user.User.id,
          },
          select: { username: true, salt: true, full_name: true },
        })

        const password = createPabau1PasswordHash(newPassword1, salt)
        await prisma.user.update({
          where: {
            id: user.User.id,
          },
          data: { password: password, password_algor: 2 },
        })
        await sendEmail({
          templateType: 'password-reset-confirm',
          to: username,
          subject: 'Password Changed Confirmation',
          fields: [
            {
              key: 'name',
              value: full_name,
            },
            {
              key: 'url',
              value:
                authenticated.remote_url || 'https://prelive-crm.pabau.com/',
            },
            {
              key: 'userEmail',
              value: username,
            },
          ],
        })

        return true
      },
    })

    t.field('forgotPassword', {
      description:
        'Sends a email to yourself, that contains a link to reset your password.',
      type: 'Boolean',
      args: {
        email: nonNull(stringArg()),
      },
      async resolve(_root, { email }, { prisma }: Context) {
        const token = uuidv4()

        const user = await prisma.user.findFirst({
          where: { username: { equals: email } },
        })

        if (!user) {
          throw new Error('Invalid username')
        }
        const data = await prisma.passwordResetAuth.upsert({
          where: { username: email },
          create: {
            username: email,
            key_code: token,
            date: new Date().toISOString(),
          },
          update: {
            key_code: { set: token },
            date: { set: new Date().toISOString() },
          },
        })

        await sendEmail({
          templateType: 'password-reset-requested',
          to: email,
          subject: 'Reset Password Request',
          fields: [
            {
              key: 'url',
              value: `https://prelive-crm.new.pabau.com/resetPassword?id=${data?.key_code}`,
            },
          ],
        })

        return true
      },
    })
  },
})

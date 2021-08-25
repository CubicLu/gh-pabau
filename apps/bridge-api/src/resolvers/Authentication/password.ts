import { intArg, extendType, nonNull, stringArg } from 'nexus'
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
        const { username, full_name } = await prisma.user.findFirst({
          rejectOnNotFound: true,
          where: { id: user, company_id: { equals: company } },
          select: { username: true, full_name: true },
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
      },
    })

    t.field('resetPassword', {
      type: 'Boolean',
      description:
        'Changes the password for the user based on a token received over email',
      args: {
        userId: nonNull(intArg()),
        token: nonNull(stringArg()),
        newPassword: nonNull(stringArg()),
      },
      async resolve(_root, { userId, newPassword }, { prismaArray }) {
        if (!(await validatePassword.isValid(newPassword)))
          throw new Error('Choose a stronger password')

        const { salt, username, full_name } = await prismaArray(
          undefined
        ).user.findUnique({
          rejectOnNotFound: true,
          where: {
            id: userId,
          },
          select: { username: true, salt: true, full_name: true },
        })

        const password = createPabau1PasswordHash(salt, newPassword)

        const result = await prismaArray(undefined).user.updateMany({
          where: {
            username,
          },
          data: { password, password_algor: 2 },
        })
        console.assert(
          result,
          'Error 3489734589 - Could not update user password properly.'
        )

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
                typeof window !== 'undefined'
                  ? `${window?.location?.origin}/`
                  : '',
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

        await prisma.passwordResetAuth.upsert({
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
        return true
      },
    })
  },
})

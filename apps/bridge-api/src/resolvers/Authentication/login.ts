import { extendType, intArg, nonNull, stringArg } from 'nexus'
import { generateJWT } from '../../app/authentication/authentication-service'
import { Context } from '../../context'
import { createPabau1PasswordHash } from './password'

const userSelect = {
  id: true,
  username: true,
  password: true,
  password_algor: true,
  salt: true,
  hash: true,
  admin: true,
  locale: true,
  Company: {
    select: {
      id: true,
      admin: true,
      remote_url: true,
      remote_connect: true,
      details: {
        select: {
          language: true,
        },
      },
    },
  },
} as const

export const Login = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('login', {
      type: 'String',
      description: 'Log in to Pabau',
      args: {
        username: nonNull(stringArg()),
        password: stringArg(),
      },
      async resolve(
        _root,
        { username, password },
        { authenticated, prismaArray }: Context
      ) {
        const users = await prismaArray(undefined).user.findMany({
          where: {
            username: {
              equals: username,
            },
          },
          select: userSelect,
        })
        if (!(users?.length > 0)) throw new Error('Incorrect email or password')

        // if (users.some((e) => e.password_algor !== 2))
        //   throw new Error(
        //     'Error 5B - Your password has not been changed for some time. Please use Pabau 1 to change it before proceeding.'
        //   )

        const salt = users[0].salt
        // if (!salt)
        //   throw new Error(
        //     'Error 5S - Your password has not been changed for some time. Please use Pabau 1 to change it before proceeding.'
        //   )

        const passwordHash = createPabau1PasswordHash(password, salt)

        const user = users.find(({ password }) => password === passwordHash)
        if (!user) {
          throw new Error('Incorrect email or password')
        }

        // Check if user appears to have no remote_url on pod db
        if (authenticated?.remote_url && !user.Company.remote_url) {
          throw new Error('Legacy/pod mismatch 1')
        }

        // Check if user appears to have a legacy JWT but company is now on a pod
        if (
          authenticated &&
          !authenticated.remote_url &&
          user.Company.remote_url
        ) {
          throw new Error('Legacy/pod mismatch 2')
        }

        // If user belongs to a pod, but we are legacy, then re-authenticate against the correct pod
        if (
          Boolean(authenticated?.remote_url) !==
          Boolean(user.Company.remote_url)
        ) {
          const user2 = await prismaArray(
            user.Company.remote_url
          ).user.findFirst({
            where: {
              username: {
                equals: user.username,
              },
              company_id: {
                equals: user.Company.id,
              },
            },
            select: userSelect,
          })
          console.log(`[auth] pod login: legacy=${user.id} pod=${user2.id}`)
          return generateJWT(user2)
        } else {
          console.log(`[auth] legacy login: legacy=${user.id}`)
          return generateJWT(user)
        }
      },
    })

    t.field('switchCompany', {
      type: 'String',
      description: 'Log in to another company you belong to',
      args: {
        companyId: nonNull(intArg()),
      },
      async resolve(
        _root,
        { companyId },
        { prismaArray, prisma, authenticated: { company, user } }: Context
      ) {
        // Get email of user from current pod
        const { username } = await prisma.user.findFirst({
          rejectOnNotFound: true,
          where: { id: user, company_id: { equals: company } },
          select: { username: true },
        })

        // Get remote_url user for new company from legacy db
        const {
          Company: { remote_url },
        } = await prismaArray(undefined).user.findFirst({
          rejectOnNotFound: true,
          where: {
            company_id: { equals: companyId },
            username: { equals: username },
          },
          select: { Company: { select: { remote_url: true } } },
        })

        // Get pod user for new company (if remote_url)
        const newPodUser = await prismaArray(remote_url).user.findFirst({
          rejectOnNotFound: true,
          where: {
            company_id: companyId,
            username: { equals: username },
          },
          select: userSelect,
        })

        return generateJWT(newPodUser)
      },
    })
  },
})

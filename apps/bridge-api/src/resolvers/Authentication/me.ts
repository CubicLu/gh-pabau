import { queryField, extendType, objectType } from 'nexus'
import { PrismaSelect } from '@paljs/plugins'

export const PodCompany = objectType({
  name: 'PodCompany',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('name', { description: 'Name of the company' })
    t.string('logo', { description: 'A URL to the logo of the company' })
    t.nonNull.boolean('isPod', { description: 'Is on a dedicated pod?' })
  },
})

export const UserWithCompanies = extendType({
  type: 'User',
  definition(t) {
    t.list.nonNull.field('companies', {
      type: 'PodCompany',
      async resolve(_root, _args, { authenticated, prisma, prismaArray }) {
        const { username } = await prisma.user.findUnique({
          rejectOnNotFound: true,
          where: { id: authenticated.user },
          select: {
            username: true,
          },
        })
        const users = await prismaArray(undefined).user.findMany({
          where: {
            username: {
              equals: username,
            },
          },
          select: {
            Company: { select: { name: true, id: true, remote_url: true } },
          },
        })

        return users.map(({ Company: { id, remote_url, name, logo } }) => ({
          id,
          isPod: Boolean(remote_url),
          name,
          logo,
        }))
      },
    })
  },
})

export const Me = queryField('me', {
  type: 'User',
  resolve: async (_root, _args, { prisma, authenticated }, info) =>
    prisma.user.findUnique({
      where: {
        id: authenticated.user,
      },
      ...new PrismaSelect(info).value,
    }),
})

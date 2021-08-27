import { queryField, extendType, objectType } from 'nexus'
import { PrismaSelect } from '@paljs/plugins'
import { Context } from '../../context'

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
      async resolve(
        _root,
        _args,
        { authenticated, prisma, prismaArray }: Context
      ) {
        console.log('companies resolver starting..')
        const { username } = await prisma.user.findUnique({
          rejectOnNotFound: true,
          where: { id: authenticated.user },
          select: {
            username: true,
          },
        })
        console.log('username', username)
        const users = await prismaArray(undefined).user.findMany({
          where: {
            username: {
              equals: username,
            },
          },
          select: {
            Company: {
              select: {
                id: true,
                remote_url: true,
                details: {
                  select: {
                    logo: true,
                    company_name: true,
                  },
                },
              },
            },
          },
        })
        console.log('found', users?.length, 'users')

        return users.map(
          ({
            Company: {
              id,
              remote_url,
              details: { company_name: name, logo },
            },
          }) => ({
            id,
            isPod: Boolean(remote_url),
            name,
            logo,
          })
        )
      },
    })
  },
})

export const Me = queryField('me', {
  type: 'User',
  resolve: async (_root, _args, { prisma, authenticated }: Context, info) => {
    console.log(
      'starting me resolver... authenticated.user=',
      authenticated.user
    )
    console.log('extended..', {
      where: {
        id: authenticated.user,
      },
      ...new PrismaSelect(info).value,
    })
    console.log(
      'full',
      await prisma.user.findUnique({
        where: {
          id: authenticated.user,
        },
      })
    )
    console.log(
      'first',
      await prisma.user.findFirst({
        where: {
          id: authenticated.user,
        },
      })
    )
    const ret = await prisma.user.findUnique({
      where: {
        id: authenticated.user,
      },
      ...new PrismaSelect(info).value,
    })
    console.log('got result!', ret)
    return ret
  },
})

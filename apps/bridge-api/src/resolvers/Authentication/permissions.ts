import { extendType, nonNull, stringArg } from 'nexus'
import { Context } from '../../context'

export const Permissions = extendType({
  type: 'Query',
  definition(t) {
    t.field('permission', {
      type: 'UserPermission',
      description: 'Validates can a user access a page',
      args: {
        page: nonNull(stringArg()),
      },
      resolve(_, { page }, ctx: Context) {
        return (
          ctx.prisma.userPermission
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
            //TODO: move this into shield permissions
            .then((data) => {
              if (data?.user !== ctx.authenticated.user) {
                throw new Error('Not Authorized')
              }
              return data
            })
        )
      },
    })
  },
})

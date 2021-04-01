import { objectType, arg, extendType } from 'nexus'

export const UserPermission = objectType({
  name: 'UserPermission',
  definition(t) {
    t.model.id()
    t.model.user()
    t.model.page()
    t.model.User()
    t.model.Page()
  },
})

export const userPermissionQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.userPermission()
    t.field('findFirstUserPermission', {
      type: 'UserPermission',
      args: {
        where: 'UserPermissionWhereInput',
        orderBy: arg({ type: 'UserPermissionOrderByInput' }),
        cursor: 'UserPermissionWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.userPermission.findFirst(args as any)
      },
    })
    t.crud.userPermissions({ filtering: true, ordering: true })
    t.field('userPermissionsCount', {
      type: 'Int',
      args: {
        where: 'UserPermissionWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.userPermission.count(args as any)
      },
    })
  },
})

export const userPermissionMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneUserPermission()
    t.crud.updateOneUserPermission()
    t.crud.upsertOneUserPermission()
    t.crud.deleteOneUserPermission()
  },
})

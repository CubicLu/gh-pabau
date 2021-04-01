import { objectType, arg, extendType } from 'nexus'

export const UserMainPermission = objectType({
  name: 'UserMainPermission',
  definition(t) {
    t.model.id()
    t.model.user_id()
    t.model.delete_alert_notes()
    t.model.User()
  },
})

export const userMainPermissionQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.userMainPermission()
    t.field('findFirstUserMainPermission', {
      type: 'UserMainPermission',
      args: {
        where: 'UserMainPermissionWhereInput',
        orderBy: arg({ type: 'UserMainPermissionOrderByInput' }),
        cursor: 'UserMainPermissionWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.userMainPermission.findFirst(args as any)
      },
    })
    t.crud.userMainPermissions({ filtering: true, ordering: true })
    t.field('userMainPermissionsCount', {
      type: 'Int',
      args: {
        where: 'UserMainPermissionWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.userMainPermission.count(args as any)
      },
    })
  },
})

export const userMainPermissionMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneUserMainPermission()
    t.crud.updateOneUserMainPermission()
    t.crud.upsertOneUserMainPermission()
    t.crud.deleteOneUserMainPermission()
    t.crud.updateManyUserMainPermission()
  },
})

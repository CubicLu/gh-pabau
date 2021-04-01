import { objectType, arg, extendType } from 'nexus'

export const UserMobilePermission = objectType({
  name: 'UserMobilePermission',
  definition(t) {
    t.model.id()
    t.model.uid()
    t.model.company_id()
    t.model.cal()
    t.model.reviews()
    t.model.reports()
    t.model.contacts()
    t.model.journey()
    t.model.register()
    t.model.dashboard()
    t.model.User()
    t.model.Company()
  },
})

export const userMobilePermissionQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.userMobilePermission()
    t.field('findFirstUserMobilePermission', {
      type: 'UserMobilePermission',
      args: {
        where: 'UserMobilePermissionWhereInput',
        orderBy: arg({ type: 'UserMobilePermissionOrderByInput' }),
        cursor: 'UserMobilePermissionWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.userMobilePermission.findFirst(args as any)
      },
    })
    t.crud.userMobilePermissions({ filtering: true, ordering: true })
    t.field('userMobilePermissionsCount', {
      type: 'Int',
      args: {
        where: 'UserMobilePermissionWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.userMobilePermission.count(args as any)
      },
    })
  },
})

export const userMobilePermissionMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneUserMobilePermission()
    t.crud.updateOneUserMobilePermission()
    t.crud.upsertOneUserMobilePermission()
    t.crud.deleteOneUserMobilePermission()
    t.crud.updateManyUserMobilePermission()
  },
})

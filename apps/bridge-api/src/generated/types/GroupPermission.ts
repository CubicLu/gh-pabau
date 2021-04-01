import { objectType, arg, extendType } from 'nexus'

export const GroupPermission = objectType({
  name: 'GroupPermission',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.group_id()
    t.model.module_permissions()
    t.model.feature_permissions()
    t.model.report_permissions()
    t.model.UserGroup()
    t.model.Company()
  },
})

export const groupPermissionQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.groupPermission()
    t.field('findFirstGroupPermission', {
      type: 'GroupPermission',
      args: {
        where: 'GroupPermissionWhereInput',
        orderBy: arg({ type: 'GroupPermissionOrderByInput' }),
        cursor: 'GroupPermissionWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.groupPermission.findFirst(args as any)
      },
    })
    t.crud.groupPermissions({ filtering: true, ordering: true })
    t.field('groupPermissionsCount', {
      type: 'Int',
      args: {
        where: 'GroupPermissionWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.groupPermission.count(args as any)
      },
    })
  },
})

export const groupPermissionMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneGroupPermission()
    t.crud.updateOneGroupPermission()
    t.crud.upsertOneGroupPermission()
    t.crud.deleteOneGroupPermission()
    t.crud.updateManyGroupPermission()
  },
})

import { objectType, arg, extendType } from 'nexus'

export const UserAlertPermission = objectType({
  name: 'UserAlertPermission',
  definition(t) {
    t.model.id()
    t.model.uid()
    t.model.alert_id()
    t.model.company_id()
    t.model.ios_notification()
    t.model.email_notification()
    t.model.sms_notification()
    t.model.pabau_notification()
    t.model.User()
    t.model.Company()
    t.model.UserAlert()
  },
})

export const userAlertPermissionQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.userAlertPermission()
    t.field('findFirstUserAlertPermission', {
      type: 'UserAlertPermission',
      args: {
        where: 'UserAlertPermissionWhereInput',
        orderBy: arg({ type: 'UserAlertPermissionOrderByInput' }),
        cursor: 'UserAlertPermissionWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.userAlertPermission.findFirst(args as any)
      },
    })
    t.crud.userAlertPermissions({ filtering: true, ordering: true })
    t.field('userAlertPermissionsCount', {
      type: 'Int',
      args: {
        where: 'UserAlertPermissionWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.userAlertPermission.count(args as any)
      },
    })
  },
})

export const userAlertPermissionMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneUserAlertPermission()
    t.crud.updateOneUserAlertPermission()
    t.crud.upsertOneUserAlertPermission()
    t.crud.deleteOneUserAlertPermission()
    t.crud.updateManyUserAlertPermission()
  },
})

import { objectType, arg, extendType } from 'nexus'

export const UserAlert = objectType({
  name: 'UserAlert',
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.description()
    t.model.image()
    t.model.email_template_id()
    t.model.ios_message()
    t.model.sms_message()
    t.model.pabau_message()
    t.model.UserAlertPermission()
  },
})

export const userAlertQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.userAlert()
    t.field('findFirstUserAlert', {
      type: 'UserAlert',
      args: {
        where: 'UserAlertWhereInput',
        orderBy: arg({ type: 'UserAlertOrderByInput' }),
        cursor: 'UserAlertWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.userAlert.findFirst(args as any)
      },
    })
    t.crud.userAlerts({ filtering: true, ordering: true })
    t.field('userAlertsCount', {
      type: 'Int',
      args: {
        where: 'UserAlertWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.userAlert.count(args as any)
      },
    })
  },
})

export const userAlertMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneUserAlert()
    t.crud.updateOneUserAlert()
    t.crud.upsertOneUserAlert()
    t.crud.deleteOneUserAlert()
    t.crud.updateManyUserAlert()
  },
})

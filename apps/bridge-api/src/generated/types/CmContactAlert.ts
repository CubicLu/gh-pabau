import { objectType, arg, extendType } from 'nexus'

export const CmContactAlert = objectType({
  name: 'CmContactAlert',
  definition(t) {
    t.model.ID()
    t.model.OwnerID()
    t.model.ContactID()
    t.model.Note()
    t.model.Status()
    t.model.CreatedDate()
    t.model.IpAddress()
    t.model.Critical()
    t.model.medical_conditions_id()
    t.model.User()
    t.model.CmContact()
    t.model.MedicalCondition()
  },
})

export const cmContactAlertQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.cmContactAlert()
    t.field('findFirstCmContactAlert', {
      type: 'CmContactAlert',
      args: {
        where: 'CmContactAlertWhereInput',
        orderBy: arg({ type: 'CmContactAlertOrderByInput' }),
        cursor: 'CmContactAlertWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmContactAlert.findFirst(args as any)
      },
    })
    t.crud.cmContactAlerts({ filtering: true, ordering: true })
    t.field('cmContactAlertsCount', {
      type: 'Int',
      args: {
        where: 'CmContactAlertWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmContactAlert.count(args as any)
      },
    })
  },
})

export const cmContactAlertMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCmContactAlert()
    t.crud.updateOneCmContactAlert()
    t.crud.upsertOneCmContactAlert()
    t.crud.deleteOneCmContactAlert()
    t.crud.updateManyCmContactAlert()
  },
})

import { objectType, arg, extendType } from 'nexus'

export const DebtManageCommunication = objectType({
  name: 'DebtManageCommunication',
  definition(t) {
    t.model.id()
    t.model.invoice_id()
    t.model.communication_id()
    t.model.letter_no()
    t.model.type()
    t.model.company_id()
    t.model.uid()
    t.model.creation_date()
    t.model.modified_date()
    t.model.Company()
  },
})

export const debtManageCommunicationQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.debtManageCommunication()
    t.field('findFirstDebtManageCommunication', {
      type: 'DebtManageCommunication',
      args: {
        where: 'DebtManageCommunicationWhereInput',
        orderBy: arg({ type: 'DebtManageCommunicationOrderByInput' }),
        cursor: 'DebtManageCommunicationWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.debtManageCommunication.findFirst(args as any)
      },
    })
    t.crud.debtManageCommunications({ filtering: true, ordering: true })
    t.field('debtManageCommunicationsCount', {
      type: 'Int',
      args: {
        where: 'DebtManageCommunicationWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.debtManageCommunication.count(args as any)
      },
    })
  },
})

export const debtManageCommunicationMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneDebtManageCommunication()
    t.crud.updateOneDebtManageCommunication()
    t.crud.upsertOneDebtManageCommunication()
    t.crud.deleteOneDebtManageCommunication()
    t.crud.updateManyDebtManageCommunication()
  },
})

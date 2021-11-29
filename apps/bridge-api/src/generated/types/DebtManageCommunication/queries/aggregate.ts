import { queryField, list } from 'nexus'

export const DebtManageCommunicationAggregateQuery = queryField(
  'aggregateDebtManageCommunication',
  {
    type: 'AggregateDebtManageCommunication',
    args: {
      where: 'DebtManageCommunicationWhereInput',
      orderBy: list('DebtManageCommunicationOrderByWithRelationInput'),
      cursor: 'DebtManageCommunicationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.debtManageCommunication.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)

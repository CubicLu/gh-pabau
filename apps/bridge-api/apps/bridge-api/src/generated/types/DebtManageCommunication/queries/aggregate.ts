import { queryField, list } from 'nexus'

export const DebtManageCommunicationAggregateQuery = queryField(
  'aggregateDebtManageCommunication',
  {
    type: 'AggregateDebtManageCommunication',
    args: {
      where: 'DebtManageCommunicationWhereInput',
      orderBy: list('DebtManageCommunicationOrderByWithRelationInput'),
      cursor: 'DebtManageCommunicationWhereUniqueInput',
      distinct: 'DebtManageCommunicationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.debtManageCommunication.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)

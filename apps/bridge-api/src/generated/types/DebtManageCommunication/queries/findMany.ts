import { queryField, nonNull, list } from 'nexus'

export const DebtManageCommunicationFindManyQuery = queryField(
  'findManyDebtManageCommunication',
  {
    type: nonNull(list(nonNull('DebtManageCommunication'))),
    args: {
      where: 'DebtManageCommunicationWhereInput',
      orderBy: list('DebtManageCommunicationOrderByWithRelationInput'),
      cursor: 'DebtManageCommunicationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('DebtManageCommunicationScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.debtManageCommunication.findMany({
        ...args,
        ...select,
      })
    },
  },
)

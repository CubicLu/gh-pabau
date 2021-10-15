import { queryField, nonNull, list } from 'nexus'

export const DebtManageCommunicationFindManyQuery = queryField(
  'findManyDebtManageCommunication',
  {
    type: nonNull(list(nonNull('DebtManageCommunication'))),
    args: {
      where: 'DebtManageCommunicationWhereInput',
      orderBy: list('DebtManageCommunicationOrderByInput'),
      cursor: 'DebtManageCommunicationWhereUniqueInput',
      distinct: 'DebtManageCommunicationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.debtManageCommunication.findMany({
        ...args,
        ...select,
      })
    },
  },
)

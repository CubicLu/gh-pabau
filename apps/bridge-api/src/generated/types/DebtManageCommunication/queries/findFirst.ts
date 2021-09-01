import { queryField, list } from 'nexus'

export const DebtManageCommunicationFindFirstQuery = queryField(
  'findFirstDebtManageCommunication',
  {
    type: 'DebtManageCommunication',
    args: {
      where: 'DebtManageCommunicationWhereInput',
      orderBy: list('DebtManageCommunicationOrderByWithRelationInput'),
      cursor: 'DebtManageCommunicationWhereUniqueInput',
      distinct: 'DebtManageCommunicationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.debtManageCommunication.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

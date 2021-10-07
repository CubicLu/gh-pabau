import { queryField, nonNull, list } from 'nexus'

export const DebtManageCommunicationFindCountQuery = queryField(
  'findManyDebtManageCommunicationCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'DebtManageCommunicationWhereInput',
      orderBy: list('DebtManageCommunicationOrderByWithRelationInput'),
      cursor: 'DebtManageCommunicationWhereUniqueInput',
      distinct: 'DebtManageCommunicationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.debtManageCommunication.count(args as any)
    },
  },
)

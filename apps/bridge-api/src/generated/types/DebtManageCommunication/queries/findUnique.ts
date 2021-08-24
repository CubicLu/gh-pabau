import { queryField, nonNull } from 'nexus'

export const DebtManageCommunicationFindUniqueQuery = queryField(
  'findUniqueDebtManageCommunication',
  {
    type: 'DebtManageCommunication',
    args: {
      where: nonNull('DebtManageCommunicationWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.debtManageCommunication.findUnique({
        where,
        ...select,
      })
    },
  },
)

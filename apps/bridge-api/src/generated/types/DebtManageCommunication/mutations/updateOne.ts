import { mutationField, nonNull } from 'nexus'

export const DebtManageCommunicationUpdateOneMutation = mutationField(
  'updateOneDebtManageCommunication',
  {
    type: nonNull('DebtManageCommunication'),
    args: {
      data: nonNull('DebtManageCommunicationUpdateInput'),
      where: nonNull('DebtManageCommunicationWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.debtManageCommunication.update({
        where,
        data,
        ...select,
      })
    },
  },
)

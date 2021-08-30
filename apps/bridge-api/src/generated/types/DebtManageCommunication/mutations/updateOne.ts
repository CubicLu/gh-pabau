import { mutationField, nonNull } from 'nexus'

export const DebtManageCommunicationUpdateOneMutation = mutationField(
  'updateOneDebtManageCommunication',
  {
    type: nonNull('DebtManageCommunication'),
    args: {
      where: nonNull('DebtManageCommunicationWhereUniqueInput'),
      data: nonNull('DebtManageCommunicationUpdateInput'),
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

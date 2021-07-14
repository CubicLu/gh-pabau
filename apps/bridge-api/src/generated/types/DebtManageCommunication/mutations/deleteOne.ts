import { mutationField, nonNull } from 'nexus'

export const DebtManageCommunicationDeleteOneMutation = mutationField(
  'deleteOneDebtManageCommunication',
  {
    type: 'DebtManageCommunication',
    args: {
      where: nonNull('DebtManageCommunicationWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.debtManageCommunication.delete({
        where,
        ...select,
      })
    },
  },
)

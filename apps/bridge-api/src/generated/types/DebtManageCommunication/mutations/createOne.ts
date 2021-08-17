import { mutationField, nonNull } from 'nexus'

export const DebtManageCommunicationCreateOneMutation = mutationField(
  'createOneDebtManageCommunication',
  {
    type: nonNull('DebtManageCommunication'),
    args: {
      data: nonNull('DebtManageCommunicationCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.debtManageCommunication.create({
        data,
        ...select,
      })
    },
  },
)

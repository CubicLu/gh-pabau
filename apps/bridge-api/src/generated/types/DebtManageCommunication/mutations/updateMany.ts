import { mutationField, nonNull } from 'nexus'

export const DebtManageCommunicationUpdateManyMutation = mutationField(
  'updateManyDebtManageCommunication',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('DebtManageCommunicationUpdateManyMutationInput'),
      where: 'DebtManageCommunicationWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.debtManageCommunication.updateMany(args as any)
    },
  },
)

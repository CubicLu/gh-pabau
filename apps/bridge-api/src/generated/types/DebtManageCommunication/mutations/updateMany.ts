import { mutationField, nonNull } from 'nexus'

export const DebtManageCommunicationUpdateManyMutation = mutationField(
  'updateManyDebtManageCommunication',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'DebtManageCommunicationWhereInput',
      data: nonNull('DebtManageCommunicationUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.debtManageCommunication.updateMany(args as any)
    },
  },
)

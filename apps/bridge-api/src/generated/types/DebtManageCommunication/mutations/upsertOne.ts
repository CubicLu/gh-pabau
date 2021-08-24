import { mutationField, nonNull } from 'nexus'

export const DebtManageCommunicationUpsertOneMutation = mutationField(
  'upsertOneDebtManageCommunication',
  {
    type: nonNull('DebtManageCommunication'),
    args: {
      where: nonNull('DebtManageCommunicationWhereUniqueInput'),
      create: nonNull('DebtManageCommunicationCreateInput'),
      update: nonNull('DebtManageCommunicationUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.debtManageCommunication.upsert({
        ...args,
        ...select,
      })
    },
  },
)

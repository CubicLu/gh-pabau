import { mutationField, nonNull } from 'nexus'

export const MedicalFormContactHistoryUpdateManyMutation = mutationField(
  'updateManyMedicalFormContactHistory',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'MedicalFormContactHistoryWhereInput',
      data: nonNull('MedicalFormContactHistoryUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.medicalFormContactHistory.updateMany(args as any)
    },
  },
)

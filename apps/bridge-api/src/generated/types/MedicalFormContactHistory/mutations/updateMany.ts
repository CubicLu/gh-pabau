import { mutationField, nonNull } from 'nexus'

export const MedicalFormContactHistoryUpdateManyMutation = mutationField(
  'updateManyMedicalFormContactHistory',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('MedicalFormContactHistoryUpdateManyMutationInput'),
      where: 'MedicalFormContactHistoryWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.medicalFormContactHistory.updateMany(args as any)
    },
  },
)

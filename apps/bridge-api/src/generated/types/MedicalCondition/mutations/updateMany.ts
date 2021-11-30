import { mutationField, nonNull } from 'nexus'

export const MedicalConditionUpdateManyMutation = mutationField(
  'updateManyMedicalCondition',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('MedicalConditionUpdateManyMutationInput'),
      where: 'MedicalConditionWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.medicalCondition.updateMany(args as any)
    },
  },
)

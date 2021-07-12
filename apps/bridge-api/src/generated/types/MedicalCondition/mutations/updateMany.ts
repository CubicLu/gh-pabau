import { mutationField, nonNull } from 'nexus'

export const MedicalConditionUpdateManyMutation = mutationField(
  'updateManyMedicalCondition',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'MedicalConditionWhereInput',
      data: nonNull('MedicalConditionUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.medicalCondition.updateMany(args as any)
    },
  },
)

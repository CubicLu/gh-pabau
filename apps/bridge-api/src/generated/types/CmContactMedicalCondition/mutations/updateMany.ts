import { mutationField, nonNull } from 'nexus'

export const CmContactMedicalConditionUpdateManyMutation = mutationField(
  'updateManyCmContactMedicalCondition',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CmContactMedicalConditionWhereInput',
      data: nonNull('CmContactMedicalConditionUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmContactMedicalCondition.updateMany(args as any)
    },
  },
)

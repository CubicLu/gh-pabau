import { mutationField, nonNull } from 'nexus'

export const HealthcodeInsurerUpdateManyMutation = mutationField(
  'updateManyHealthcodeInsurer',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('HealthcodeInsurerUpdateManyMutationInput'),
      where: 'HealthcodeInsurerWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.healthcodeInsurer.updateMany(args as any)
    },
  },
)

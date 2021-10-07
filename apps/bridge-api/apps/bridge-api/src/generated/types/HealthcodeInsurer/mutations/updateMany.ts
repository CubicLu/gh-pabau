import { mutationField, nonNull } from 'nexus'

export const HealthcodeInsurerUpdateManyMutation = mutationField(
  'updateManyHealthcodeInsurer',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'HealthcodeInsurerWhereInput',
      data: nonNull('HealthcodeInsurerUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.healthcodeInsurer.updateMany(args as any)
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const HealthcodeInsurerUpsertOneMutation = mutationField(
  'upsertOneHealthcodeInsurer',
  {
    type: nonNull('HealthcodeInsurer'),
    args: {
      where: nonNull('HealthcodeInsurerWhereUniqueInput'),
      create: nonNull('HealthcodeInsurerCreateInput'),
      update: nonNull('HealthcodeInsurerUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.healthcodeInsurer.upsert({
        ...args,
        ...select,
      })
    },
  },
)

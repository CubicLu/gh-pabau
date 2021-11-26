import { mutationField, nonNull } from 'nexus'

export const HealthcodeInsurerUpdateOneMutation = mutationField(
  'updateOneHealthcodeInsurer',
  {
    type: nonNull('HealthcodeInsurer'),
    args: {
      data: nonNull('HealthcodeInsurerUpdateInput'),
      where: nonNull('HealthcodeInsurerWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.healthcodeInsurer.update({
        where,
        data,
        ...select,
      })
    },
  },
)

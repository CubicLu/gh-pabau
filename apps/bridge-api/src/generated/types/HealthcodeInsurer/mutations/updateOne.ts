import { mutationField, nonNull } from 'nexus'

export const HealthcodeInsurerUpdateOneMutation = mutationField(
  'updateOneHealthcodeInsurer',
  {
    type: nonNull('HealthcodeInsurer'),
    args: {
      where: nonNull('HealthcodeInsurerWhereUniqueInput'),
      data: nonNull('HealthcodeInsurerUpdateInput'),
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

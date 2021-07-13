import { mutationField, nonNull } from 'nexus'

export const HealthcodeInsurerDeleteOneMutation = mutationField(
  'deleteOneHealthcodeInsurer',
  {
    type: 'HealthcodeInsurer',
    args: {
      where: nonNull('HealthcodeInsurerWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.healthcodeInsurer.delete({
        where,
        ...select,
      })
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const InsuranceDetailDeleteOneMutation = mutationField(
  'deleteOneInsuranceDetail',
  {
    type: 'InsuranceDetail',
    args: {
      where: nonNull('InsuranceDetailWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.insuranceDetail.delete({
        where,
        ...select,
      })
    },
  },
)

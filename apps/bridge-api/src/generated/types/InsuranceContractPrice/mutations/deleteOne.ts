import { mutationField, nonNull } from 'nexus'

export const InsuranceContractPriceDeleteOneMutation = mutationField(
  'deleteOneInsuranceContractPrice',
  {
    type: 'InsuranceContractPrice',
    args: {
      where: nonNull('InsuranceContractPriceWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.insuranceContractPrice.delete({
        where,
        ...select,
      })
    },
  },
)

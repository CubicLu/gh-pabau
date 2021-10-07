import { mutationField, nonNull } from 'nexus'

export const InsuranceContractPriceUpdateOneMutation = mutationField(
  'updateOneInsuranceContractPrice',
  {
    type: nonNull('InsuranceContractPrice'),
    args: {
      where: nonNull('InsuranceContractPriceWhereUniqueInput'),
      data: nonNull('InsuranceContractPriceUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.insuranceContractPrice.update({
        where,
        data,
        ...select,
      })
    },
  },
)

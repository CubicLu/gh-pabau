import { mutationField, nonNull } from 'nexus'

export const InsuranceContractPriceUpdateOneMutation = mutationField(
  'updateOneInsuranceContractPrice',
  {
    type: nonNull('InsuranceContractPrice'),
    args: {
      data: nonNull('InsuranceContractPriceUpdateInput'),
      where: nonNull('InsuranceContractPriceWhereUniqueInput'),
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

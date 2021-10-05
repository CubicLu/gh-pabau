import { queryField, nonNull } from 'nexus'

export const InsuranceContractPriceFindUniqueQuery = queryField(
  'findUniqueInsuranceContractPrice',
  {
    type: 'InsuranceContractPrice',
    args: {
      where: nonNull('InsuranceContractPriceWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.insuranceContractPrice.findUnique({
        where,
        ...select,
      })
    },
  },
)

import { queryField, list } from 'nexus'

export const InsuranceContractPriceFindFirstQuery = queryField(
  'findFirstInsuranceContractPrice',
  {
    type: 'InsuranceContractPrice',
    args: {
      where: 'InsuranceContractPriceWhereInput',
      orderBy: list('InsuranceContractPriceOrderByWithRelationInput'),
      cursor: 'InsuranceContractPriceWhereUniqueInput',
      distinct: 'InsuranceContractPriceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.insuranceContractPrice.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

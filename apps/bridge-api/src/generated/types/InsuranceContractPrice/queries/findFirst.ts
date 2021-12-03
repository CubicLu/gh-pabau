import { queryField, list } from 'nexus'

export const InsuranceContractPriceFindFirstQuery = queryField(
  'findFirstInsuranceContractPrice',
  {
    type: 'InsuranceContractPrice',
    args: {
      where: 'InsuranceContractPriceWhereInput',
      orderBy: list('InsuranceContractPriceOrderByWithRelationInput'),
      cursor: 'InsuranceContractPriceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('InsuranceContractPriceScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.insuranceContractPrice.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

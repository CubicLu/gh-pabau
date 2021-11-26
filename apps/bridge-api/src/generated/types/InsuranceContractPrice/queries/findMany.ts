import { queryField, nonNull, list } from 'nexus'

export const InsuranceContractPriceFindManyQuery = queryField(
  'findManyInsuranceContractPrice',
  {
    type: nonNull(list(nonNull('InsuranceContractPrice'))),
    args: {
      where: 'InsuranceContractPriceWhereInput',
      orderBy: list('InsuranceContractPriceOrderByWithRelationInput'),
      cursor: 'InsuranceContractPriceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('InsuranceContractPriceScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.insuranceContractPrice.findMany({
        ...args,
        ...select,
      })
    },
  },
)

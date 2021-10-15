import { queryField, nonNull, list } from 'nexus'

export const InsuranceContractPriceFindManyQuery = queryField(
  'findManyInsuranceContractPrice',
  {
    type: nonNull(list(nonNull('InsuranceContractPrice'))),
    args: {
      where: 'InsuranceContractPriceWhereInput',
      orderBy: list('InsuranceContractPriceOrderByInput'),
      cursor: 'InsuranceContractPriceWhereUniqueInput',
      distinct: 'InsuranceContractPriceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.insuranceContractPrice.findMany({
        ...args,
        ...select,
      })
    },
  },
)

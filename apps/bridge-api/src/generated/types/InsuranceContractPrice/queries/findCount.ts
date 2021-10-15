import { queryField, nonNull, list } from 'nexus'

export const InsuranceContractPriceFindCountQuery = queryField(
  'findManyInsuranceContractPriceCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'InsuranceContractPriceWhereInput',
      orderBy: list('InsuranceContractPriceOrderByInput'),
      cursor: 'InsuranceContractPriceWhereUniqueInput',
      distinct: 'InsuranceContractPriceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.insuranceContractPrice.count(args as any)
    },
  },
)

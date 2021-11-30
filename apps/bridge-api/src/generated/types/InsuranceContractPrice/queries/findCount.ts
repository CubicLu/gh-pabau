import { queryField, nonNull, list } from 'nexus'

export const InsuranceContractPriceFindCountQuery = queryField(
  'findManyInsuranceContractPriceCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'InsuranceContractPriceWhereInput',
      orderBy: list('InsuranceContractPriceOrderByWithRelationInput'),
      cursor: 'InsuranceContractPriceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('InsuranceContractPriceScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.insuranceContractPrice.count(args as any)
    },
  },
)

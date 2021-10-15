import { queryField, list } from 'nexus'

export const InsuranceContractPriceAggregateQuery = queryField(
  'aggregateInsuranceContractPrice',
  {
    type: 'AggregateInsuranceContractPrice',
    args: {
      where: 'InsuranceContractPriceWhereInput',
      orderBy: list('InsuranceContractPriceOrderByInput'),
      cursor: 'InsuranceContractPriceWhereUniqueInput',
      distinct: 'InsuranceContractPriceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.insuranceContractPrice.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)

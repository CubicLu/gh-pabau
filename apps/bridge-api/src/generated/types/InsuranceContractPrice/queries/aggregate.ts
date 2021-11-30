import { queryField, list } from 'nexus'

export const InsuranceContractPriceAggregateQuery = queryField(
  'aggregateInsuranceContractPrice',
  {
    type: 'AggregateInsuranceContractPrice',
    args: {
      where: 'InsuranceContractPriceWhereInput',
      orderBy: list('InsuranceContractPriceOrderByWithRelationInput'),
      cursor: 'InsuranceContractPriceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.insuranceContractPrice.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)

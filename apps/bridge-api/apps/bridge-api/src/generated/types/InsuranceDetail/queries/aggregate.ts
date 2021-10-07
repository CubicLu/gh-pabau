import { queryField, list } from 'nexus'

export const InsuranceDetailAggregateQuery = queryField(
  'aggregateInsuranceDetail',
  {
    type: 'AggregateInsuranceDetail',
    args: {
      where: 'InsuranceDetailWhereInput',
      orderBy: list('InsuranceDetailOrderByWithRelationInput'),
      cursor: 'InsuranceDetailWhereUniqueInput',
      distinct: 'InsuranceDetailScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.insuranceDetail.aggregate({ ...args, ...select }) as any
    },
  },
)

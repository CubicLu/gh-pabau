import { queryField, list } from 'nexus'

export const InsuranceDetailAggregateQuery = queryField(
  'aggregateInsuranceDetail',
  {
    type: 'AggregateInsuranceDetail',
    args: {
      where: 'InsuranceDetailWhereInput',
      orderBy: list('InsuranceDetailOrderByWithRelationInput'),
      cursor: 'InsuranceDetailWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.insuranceDetail.aggregate({ ...args, ...select }) as any
    },
  },
)

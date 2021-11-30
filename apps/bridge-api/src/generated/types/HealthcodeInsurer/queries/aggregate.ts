import { queryField, list } from 'nexus'

export const HealthcodeInsurerAggregateQuery = queryField(
  'aggregateHealthcodeInsurer',
  {
    type: 'AggregateHealthcodeInsurer',
    args: {
      where: 'HealthcodeInsurerWhereInput',
      orderBy: list('HealthcodeInsurerOrderByWithRelationInput'),
      cursor: 'HealthcodeInsurerWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.healthcodeInsurer.aggregate({ ...args, ...select }) as any
    },
  },
)

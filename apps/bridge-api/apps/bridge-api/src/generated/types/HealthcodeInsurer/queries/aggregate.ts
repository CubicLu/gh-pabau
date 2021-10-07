import { queryField, list } from 'nexus'

export const HealthcodeInsurerAggregateQuery = queryField(
  'aggregateHealthcodeInsurer',
  {
    type: 'AggregateHealthcodeInsurer',
    args: {
      where: 'HealthcodeInsurerWhereInput',
      orderBy: list('HealthcodeInsurerOrderByWithRelationInput'),
      cursor: 'HealthcodeInsurerWhereUniqueInput',
      distinct: 'HealthcodeInsurerScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.healthcodeInsurer.aggregate({ ...args, ...select }) as any
    },
  },
)

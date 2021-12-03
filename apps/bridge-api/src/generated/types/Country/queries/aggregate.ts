import { queryField, list } from 'nexus'

export const CountryAggregateQuery = queryField('aggregateCountry', {
  type: 'AggregateCountry',
  args: {
    where: 'CountryWhereInput',
    orderBy: list('CountryOrderByWithRelationInput'),
    cursor: 'CountryWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.country.aggregate({ ...args, ...select }) as any
  },
})

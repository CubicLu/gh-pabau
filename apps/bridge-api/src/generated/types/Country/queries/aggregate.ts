import { queryField, list } from 'nexus'

export const CountryAggregateQuery = queryField('aggregateCountry', {
  type: 'AggregateCountry',
  args: {
    where: 'CountryWhereInput',
    orderBy: list('CountryOrderByInput'),
    cursor: 'CountryWhereUniqueInput',
    distinct: 'CountryScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.country.aggregate({ ...args, ...select }) as any
  },
})

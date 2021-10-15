import { queryField, nonNull, list } from 'nexus'

export const CountryFindCountQuery = queryField('findManyCountryCount', {
  type: nonNull('Int'),
  args: {
    where: 'CountryWhereInput',
    orderBy: list('CountryOrderByInput'),
    cursor: 'CountryWhereUniqueInput',
    distinct: 'CountryScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.country.count(args as any)
  },
})

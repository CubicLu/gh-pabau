import { queryField, nonNull, list } from 'nexus'

export const CountryFindCountQuery = queryField('findManyCountryCount', {
  type: nonNull('Int'),
  args: {
    where: 'CountryWhereInput',
    orderBy: list('CountryOrderByWithRelationInput'),
    cursor: 'CountryWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CountryScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.country.count(args as any)
  },
})

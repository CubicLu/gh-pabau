import { queryField, nonNull, list } from 'nexus'

export const CountryFindManyQuery = queryField('findManyCountry', {
  type: nonNull(list(nonNull('Country'))),
  args: {
    where: 'CountryWhereInput',
    orderBy: list('CountryOrderByInput'),
    cursor: 'CountryWhereUniqueInput',
    distinct: 'CountryScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.country.findMany({
      ...args,
      ...select,
    })
  },
})

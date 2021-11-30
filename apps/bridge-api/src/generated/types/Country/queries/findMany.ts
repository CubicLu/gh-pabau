import { queryField, nonNull, list } from 'nexus'

export const CountryFindManyQuery = queryField('findManyCountry', {
  type: nonNull(list(nonNull('Country'))),
  args: {
    where: 'CountryWhereInput',
    orderBy: list('CountryOrderByWithRelationInput'),
    cursor: 'CountryWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CountryScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.country.findMany({
      ...args,
      ...select,
    })
  },
})

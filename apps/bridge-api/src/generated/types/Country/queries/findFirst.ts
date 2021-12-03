import { queryField, list } from 'nexus'

export const CountryFindFirstQuery = queryField('findFirstCountry', {
  type: 'Country',
  args: {
    where: 'CountryWhereInput',
    orderBy: list('CountryOrderByWithRelationInput'),
    cursor: 'CountryWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CountryScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.country.findFirst({
      ...args,
      ...select,
    })
  },
})

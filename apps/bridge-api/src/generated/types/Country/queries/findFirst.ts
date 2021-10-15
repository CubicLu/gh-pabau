import { queryField, list } from 'nexus'

export const CountryFindFirstQuery = queryField('findFirstCountry', {
  type: 'Country',
  args: {
    where: 'CountryWhereInput',
    orderBy: list('CountryOrderByInput'),
    cursor: 'CountryWhereUniqueInput',
    distinct: 'CountryScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.country.findFirst({
      ...args,
      ...select,
    })
  },
})

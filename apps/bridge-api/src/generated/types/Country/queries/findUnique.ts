import { queryField, nonNull } from 'nexus'

export const CountryFindUniqueQuery = queryField('findUniqueCountry', {
  type: 'Country',
  args: {
    where: nonNull('CountryWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.country.findUnique({
      where,
      ...select,
    })
  },
})

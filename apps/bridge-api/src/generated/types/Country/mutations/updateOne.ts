import { mutationField, nonNull } from 'nexus'

export const CountryUpdateOneMutation = mutationField('updateOneCountry', {
  type: nonNull('Country'),
  args: {
    data: nonNull('CountryUpdateInput'),
    where: nonNull('CountryWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.country.update({
      where,
      data,
      ...select,
    })
  },
})

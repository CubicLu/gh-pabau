import { mutationField, nonNull } from 'nexus'

export const CountryDeleteOneMutation = mutationField('deleteOneCountry', {
  type: 'Country',
  args: {
    where: nonNull('CountryWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.country.delete({
      where,
      ...select,
    })
  },
})

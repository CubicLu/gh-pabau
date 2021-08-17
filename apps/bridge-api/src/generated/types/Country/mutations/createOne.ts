import { mutationField, nonNull } from 'nexus'

export const CountryCreateOneMutation = mutationField('createOneCountry', {
  type: nonNull('Country'),
  args: {
    data: nonNull('CountryCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.country.create({
      data,
      ...select,
    })
  },
})

import { mutationField, nonNull } from 'nexus'

export const CountryUpsertOneMutation = mutationField('upsertOneCountry', {
  type: nonNull('Country'),
  args: {
    where: nonNull('CountryWhereUniqueInput'),
    create: nonNull('CountryCreateInput'),
    update: nonNull('CountryUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.country.upsert({
      ...args,
      ...select,
    })
  },
})

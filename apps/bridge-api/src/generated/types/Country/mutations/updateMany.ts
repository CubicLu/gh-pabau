import { mutationField, nonNull } from 'nexus'

export const CountryUpdateManyMutation = mutationField('updateManyCountry', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'CountryWhereInput',
    data: nonNull('CountryUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.country.updateMany(args as any)
  },
})

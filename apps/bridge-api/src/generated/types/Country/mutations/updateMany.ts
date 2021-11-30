import { mutationField, nonNull } from 'nexus'

export const CountryUpdateManyMutation = mutationField('updateManyCountry', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('CountryUpdateManyMutationInput'),
    where: 'CountryWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.country.updateMany(args as any)
  },
})

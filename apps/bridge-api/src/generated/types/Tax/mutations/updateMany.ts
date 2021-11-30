import { mutationField, nonNull } from 'nexus'

export const TaxUpdateManyMutation = mutationField('updateManyTax', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('TaxUpdateManyMutationInput'),
    where: 'TaxWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.tax.updateMany(args as any)
  },
})

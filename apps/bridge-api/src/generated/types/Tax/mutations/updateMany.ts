import { mutationField, nonNull } from 'nexus'

export const TaxUpdateManyMutation = mutationField('updateManyTax', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'TaxWhereInput',
    data: nonNull('TaxUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.tax.updateMany(args as any)
  },
})

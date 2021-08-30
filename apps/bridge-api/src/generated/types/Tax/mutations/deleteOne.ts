import { mutationField, nonNull } from 'nexus'

export const TaxDeleteOneMutation = mutationField('deleteOneTax', {
  type: 'Tax',
  args: {
    where: nonNull('TaxWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.tax.delete({
      where,
      ...select,
    })
  },
})

import { mutationField, nonNull } from 'nexus'

export const TaxUpdateOneMutation = mutationField('updateOneTax', {
  type: nonNull('Tax'),
  args: {
    data: nonNull('TaxUpdateInput'),
    where: nonNull('TaxWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.tax.update({
      where,
      data,
      ...select,
    })
  },
})

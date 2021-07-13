import { mutationField, nonNull } from 'nexus'

export const TaxUpdateOneMutation = mutationField('updateOneTax', {
  type: nonNull('Tax'),
  args: {
    where: nonNull('TaxWhereUniqueInput'),
    data: nonNull('TaxUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.tax.update({
      where,
      data,
      ...select,
    })
  },
})

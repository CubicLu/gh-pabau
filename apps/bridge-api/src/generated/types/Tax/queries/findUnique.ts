import { queryField, nonNull } from 'nexus'

export const TaxFindUniqueQuery = queryField('findUniqueTax', {
  type: 'Tax',
  args: {
    where: nonNull('TaxWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.tax.findUnique({
      where,
      ...select,
    })
  },
})

import { mutationField, nonNull } from 'nexus'

export const TaxCreateOneMutation = mutationField('createOneTax', {
  type: nonNull('Tax'),
  args: {
    data: nonNull('TaxCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.tax.create({
      data,
      ...select,
    })
  },
})

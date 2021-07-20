import { mutationField, nonNull } from 'nexus'

export const TaxUpsertOneMutation = mutationField('upsertOneTax', {
  type: nonNull('Tax'),
  args: {
    where: nonNull('TaxWhereUniqueInput'),
    create: nonNull('TaxCreateInput'),
    update: nonNull('TaxUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.tax.upsert({
      ...args,
      ...select,
    })
  },
})

import { mutationField, nonNull } from 'nexus'

export const SaleItemUpsertOneMutation = mutationField('upsertOneSaleItem', {
  type: nonNull('SaleItem'),
  args: {
    where: nonNull('SaleItemWhereUniqueInput'),
    create: nonNull('SaleItemCreateInput'),
    update: nonNull('SaleItemUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.saleItem.upsert({
      ...args,
      ...select,
    })
  },
})

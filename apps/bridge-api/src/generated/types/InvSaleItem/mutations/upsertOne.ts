import { mutationField, nonNull } from 'nexus'

export const InvSaleItemUpsertOneMutation = mutationField(
  'upsertOneInvSaleItem',
  {
    type: nonNull('InvSaleItem'),
    args: {
      where: nonNull('InvSaleItemWhereUniqueInput'),
      create: nonNull('InvSaleItemCreateInput'),
      update: nonNull('InvSaleItemUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.invSaleItem.upsert({
        ...args,
        ...select,
      })
    },
  },
)

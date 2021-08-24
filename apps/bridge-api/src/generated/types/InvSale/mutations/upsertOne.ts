import { mutationField, nonNull } from 'nexus'

export const InvSaleUpsertOneMutation = mutationField('upsertOneInvSale', {
  type: nonNull('InvSale'),
  args: {
    where: nonNull('InvSaleWhereUniqueInput'),
    create: nonNull('InvSaleCreateInput'),
    update: nonNull('InvSaleUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invSale.upsert({
      ...args,
      ...select,
    })
  },
})

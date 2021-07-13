import { mutationField, nonNull } from 'nexus'

export const InvSaleCreateOneMutation = mutationField('createOneInvSale', {
  type: nonNull('InvSale'),
  args: {
    data: nonNull('InvSaleCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.invSale.create({
      data,
      ...select,
    })
  },
})

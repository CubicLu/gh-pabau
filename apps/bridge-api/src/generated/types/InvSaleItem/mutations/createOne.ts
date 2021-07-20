import { mutationField, nonNull } from 'nexus'

export const InvSaleItemCreateOneMutation = mutationField(
  'createOneInvSaleItem',
  {
    type: nonNull('InvSaleItem'),
    args: {
      data: nonNull('InvSaleItemCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.invSaleItem.create({
        data,
        ...select,
      })
    },
  },
)

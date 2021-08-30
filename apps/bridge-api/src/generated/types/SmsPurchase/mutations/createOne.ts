import { mutationField, nonNull } from 'nexus'

export const SmsPurchaseCreateOneMutation = mutationField(
  'createOneSmsPurchase',
  {
    type: nonNull('SmsPurchase'),
    args: {
      data: nonNull('SmsPurchaseCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.smsPurchase.create({
        data,
        ...select,
      })
    },
  },
)

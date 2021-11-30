import { mutationField, nonNull } from 'nexus'

export const SmsPurchaseUpdateOneMutation = mutationField(
  'updateOneSmsPurchase',
  {
    type: nonNull('SmsPurchase'),
    args: {
      data: nonNull('SmsPurchaseUpdateInput'),
      where: nonNull('SmsPurchaseWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.smsPurchase.update({
        where,
        data,
        ...select,
      })
    },
  },
)

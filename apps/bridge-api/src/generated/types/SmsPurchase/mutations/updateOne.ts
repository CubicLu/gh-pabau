import { mutationField, nonNull } from 'nexus'

export const SmsPurchaseUpdateOneMutation = mutationField(
  'updateOneSmsPurchase',
  {
    type: nonNull('SmsPurchase'),
    args: {
      where: nonNull('SmsPurchaseWhereUniqueInput'),
      data: nonNull('SmsPurchaseUpdateInput'),
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

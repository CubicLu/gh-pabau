import { mutationField, nonNull } from 'nexus'

export const SmsPurchaseUpsertOneMutation = mutationField(
  'upsertOneSmsPurchase',
  {
    type: nonNull('SmsPurchase'),
    args: {
      where: nonNull('SmsPurchaseWhereUniqueInput'),
      create: nonNull('SmsPurchaseCreateInput'),
      update: nonNull('SmsPurchaseUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.smsPurchase.upsert({
        ...args,
        ...select,
      })
    },
  },
)

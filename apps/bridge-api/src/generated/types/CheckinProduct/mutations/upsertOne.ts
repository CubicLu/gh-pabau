import { mutationField, nonNull } from 'nexus'

export const CheckinProductUpsertOneMutation = mutationField(
  'upsertOneCheckinProduct',
  {
    type: nonNull('CheckinProduct'),
    args: {
      where: nonNull('CheckinProductWhereUniqueInput'),
      create: nonNull('CheckinProductCreateInput'),
      update: nonNull('CheckinProductUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.checkinProduct.upsert({
        ...args,
        ...select,
      })
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const CmCouponClickUpsertOneMutation = mutationField(
  'upsertOneCmCouponClick',
  {
    type: nonNull('CmCouponClick'),
    args: {
      where: nonNull('CmCouponClickWhereUniqueInput'),
      create: nonNull('CmCouponClickCreateInput'),
      update: nonNull('CmCouponClickUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmCouponClick.upsert({
        ...args,
        ...select,
      })
    },
  },
)

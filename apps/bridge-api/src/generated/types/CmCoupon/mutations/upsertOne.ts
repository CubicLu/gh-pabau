import { mutationField, nonNull } from 'nexus'

export const CmCouponUpsertOneMutation = mutationField('upsertOneCmCoupon', {
  type: nonNull('CmCoupon'),
  args: {
    where: nonNull('CmCouponWhereUniqueInput'),
    create: nonNull('CmCouponCreateInput'),
    update: nonNull('CmCouponUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmCoupon.upsert({
      ...args,
      ...select,
    })
  },
})

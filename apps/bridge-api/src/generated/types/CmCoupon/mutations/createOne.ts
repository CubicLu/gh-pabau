import { mutationField, nonNull } from 'nexus'

export const CmCouponCreateOneMutation = mutationField('createOneCmCoupon', {
  type: nonNull('CmCoupon'),
  args: {
    data: nonNull('CmCouponCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.cmCoupon.create({
      data,
      ...select,
    })
  },
})

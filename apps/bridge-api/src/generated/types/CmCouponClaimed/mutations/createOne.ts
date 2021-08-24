import { mutationField, nonNull } from 'nexus'

export const CmCouponClaimedCreateOneMutation = mutationField(
  'createOneCmCouponClaimed',
  {
    type: nonNull('CmCouponClaimed'),
    args: {
      data: nonNull('CmCouponClaimedCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cmCouponClaimed.create({
        data,
        ...select,
      })
    },
  },
)

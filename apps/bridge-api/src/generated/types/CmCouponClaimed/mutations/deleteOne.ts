import { mutationField, nonNull } from 'nexus'

export const CmCouponClaimedDeleteOneMutation = mutationField(
  'deleteOneCmCouponClaimed',
  {
    type: 'CmCouponClaimed',
    args: {
      where: nonNull('CmCouponClaimedWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cmCouponClaimed.delete({
        where,
        ...select,
      })
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const CmCouponClickDeleteOneMutation = mutationField(
  'deleteOneCmCouponClick',
  {
    type: 'CmCouponClick',
    args: {
      where: nonNull('CmCouponClickWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cmCouponClick.delete({
        where,
        ...select,
      })
    },
  },
)

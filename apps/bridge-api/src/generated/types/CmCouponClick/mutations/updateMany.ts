import { mutationField, nonNull } from 'nexus'

export const CmCouponClickUpdateManyMutation = mutationField(
  'updateManyCmCouponClick',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CmCouponClickUpdateManyMutationInput'),
      where: 'CmCouponClickWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmCouponClick.updateMany(args as any)
    },
  },
)

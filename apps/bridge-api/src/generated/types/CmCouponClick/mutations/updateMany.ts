import { mutationField, nonNull } from 'nexus'

export const CmCouponClickUpdateManyMutation = mutationField(
  'updateManyCmCouponClick',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CmCouponClickWhereInput',
      data: nonNull('CmCouponClickUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmCouponClick.updateMany(args as any)
    },
  },
)

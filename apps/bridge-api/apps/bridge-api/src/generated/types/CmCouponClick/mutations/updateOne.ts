import { mutationField, nonNull } from 'nexus'

export const CmCouponClickUpdateOneMutation = mutationField(
  'updateOneCmCouponClick',
  {
    type: nonNull('CmCouponClick'),
    args: {
      where: nonNull('CmCouponClickWhereUniqueInput'),
      data: nonNull('CmCouponClickUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmCouponClick.update({
        where,
        data,
        ...select,
      })
    },
  },
)

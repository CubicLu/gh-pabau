import { mutationField, nonNull } from 'nexus'

export const CmCouponClickUpdateOneMutation = mutationField(
  'updateOneCmCouponClick',
  {
    type: nonNull('CmCouponClick'),
    args: {
      data: nonNull('CmCouponClickUpdateInput'),
      where: nonNull('CmCouponClickWhereUniqueInput'),
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

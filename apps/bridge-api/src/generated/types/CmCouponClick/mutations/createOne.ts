import { mutationField, nonNull } from 'nexus'

export const CmCouponClickCreateOneMutation = mutationField(
  'createOneCmCouponClick',
  {
    type: nonNull('CmCouponClick'),
    args: {
      data: nonNull('CmCouponClickCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cmCouponClick.create({
        data,
        ...select,
      })
    },
  },
)

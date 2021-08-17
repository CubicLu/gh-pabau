import { mutationField, nonNull } from 'nexus'

export const CheckinProductUpdateOneMutation = mutationField(
  'updateOneCheckinProduct',
  {
    type: nonNull('CheckinProduct'),
    args: {
      where: nonNull('CheckinProductWhereUniqueInput'),
      data: nonNull('CheckinProductUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.checkinProduct.update({
        where,
        data,
        ...select,
      })
    },
  },
)

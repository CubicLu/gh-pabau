import { mutationField, nonNull } from 'nexus'

export const CheckinProductUpdateOneMutation = mutationField(
  'updateOneCheckinProduct',
  {
    type: nonNull('CheckinProduct'),
    args: {
      data: nonNull('CheckinProductUpdateInput'),
      where: nonNull('CheckinProductWhereUniqueInput'),
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

import { mutationField, nonNull } from 'nexus'

export const CheckinProductDeleteOneMutation = mutationField(
  'deleteOneCheckinProduct',
  {
    type: 'CheckinProduct',
    args: {
      where: nonNull('CheckinProductWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.checkinProduct.delete({
        where,
        ...select,
      })
    },
  },
)

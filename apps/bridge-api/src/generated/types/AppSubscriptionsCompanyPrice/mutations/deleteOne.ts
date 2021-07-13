import { mutationField, nonNull } from 'nexus'

export const AppSubscriptionsCompanyPriceDeleteOneMutation = mutationField(
  'deleteOneAppSubscriptionsCompanyPrice',
  {
    type: 'AppSubscriptionsCompanyPrice',
    args: {
      where: nonNull('AppSubscriptionsCompanyPriceWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.appSubscriptionsCompanyPrice.delete({
        where,
        ...select,
      })
    },
  },
)

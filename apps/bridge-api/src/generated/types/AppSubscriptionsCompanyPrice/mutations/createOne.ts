import { mutationField, nonNull } from 'nexus'

export const AppSubscriptionsCompanyPriceCreateOneMutation = mutationField(
  'createOneAppSubscriptionsCompanyPrice',
  {
    type: nonNull('AppSubscriptionsCompanyPrice'),
    args: {
      data: nonNull('AppSubscriptionsCompanyPriceCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.appSubscriptionsCompanyPrice.create({
        data,
        ...select,
      })
    },
  },
)

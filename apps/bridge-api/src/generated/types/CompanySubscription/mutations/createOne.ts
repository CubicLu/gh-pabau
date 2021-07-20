import { mutationField, nonNull } from 'nexus'

export const CompanySubscriptionCreateOneMutation = mutationField(
  'createOneCompanySubscription',
  {
    type: nonNull('CompanySubscription'),
    args: {
      data: nonNull('CompanySubscriptionCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.companySubscription.create({
        data,
        ...select,
      })
    },
  },
)

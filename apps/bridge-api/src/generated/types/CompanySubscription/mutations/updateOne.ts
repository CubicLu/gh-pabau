import { mutationField, nonNull } from 'nexus'

export const CompanySubscriptionUpdateOneMutation = mutationField(
  'updateOneCompanySubscription',
  {
    type: nonNull('CompanySubscription'),
    args: {
      data: nonNull('CompanySubscriptionUpdateInput'),
      where: nonNull('CompanySubscriptionWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.companySubscription.update({
        where,
        data,
        ...select,
      })
    },
  },
)

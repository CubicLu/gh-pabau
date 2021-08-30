import { mutationField, nonNull } from 'nexus'

export const CompanySubscriptionUpdateOneMutation = mutationField(
  'updateOneCompanySubscription',
  {
    type: nonNull('CompanySubscription'),
    args: {
      where: nonNull('CompanySubscriptionWhereUniqueInput'),
      data: nonNull('CompanySubscriptionUpdateInput'),
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

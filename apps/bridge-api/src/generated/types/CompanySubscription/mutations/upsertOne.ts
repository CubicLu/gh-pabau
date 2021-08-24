import { mutationField, nonNull } from 'nexus'

export const CompanySubscriptionUpsertOneMutation = mutationField(
  'upsertOneCompanySubscription',
  {
    type: nonNull('CompanySubscription'),
    args: {
      where: nonNull('CompanySubscriptionWhereUniqueInput'),
      create: nonNull('CompanySubscriptionCreateInput'),
      update: nonNull('CompanySubscriptionUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companySubscription.upsert({
        ...args,
        ...select,
      })
    },
  },
)

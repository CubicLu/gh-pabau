import { mutationField, nonNull } from 'nexus'

export const CompanySubscriptionUpdateManyMutation = mutationField(
  'updateManyCompanySubscription',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CompanySubscriptionWhereInput',
      data: nonNull('CompanySubscriptionUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companySubscription.updateMany(args as any)
    },
  },
)

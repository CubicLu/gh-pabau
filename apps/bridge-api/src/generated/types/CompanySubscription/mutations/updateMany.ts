import { mutationField, nonNull } from 'nexus'

export const CompanySubscriptionUpdateManyMutation = mutationField(
  'updateManyCompanySubscription',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CompanySubscriptionUpdateManyMutationInput'),
      where: 'CompanySubscriptionWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companySubscription.updateMany(args as any)
    },
  },
)

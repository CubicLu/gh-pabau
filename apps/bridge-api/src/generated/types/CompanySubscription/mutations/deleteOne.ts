import { mutationField, nonNull } from 'nexus'

export const CompanySubscriptionDeleteOneMutation = mutationField(
  'deleteOneCompanySubscription',
  {
    type: 'CompanySubscription',
    args: {
      where: nonNull('CompanySubscriptionWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.companySubscription.delete({
        where,
        ...select,
      })
    },
  },
)

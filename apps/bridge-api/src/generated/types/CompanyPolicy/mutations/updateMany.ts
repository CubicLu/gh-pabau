import { mutationField, nonNull } from 'nexus'

export const CompanyPolicyUpdateManyMutation = mutationField(
  'updateManyCompanyPolicy',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CompanyPolicyWhereInput',
      data: nonNull('CompanyPolicyUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyPolicy.updateMany(args as any)
    },
  },
)

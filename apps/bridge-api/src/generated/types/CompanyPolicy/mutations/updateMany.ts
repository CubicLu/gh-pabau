import { mutationField, nonNull } from 'nexus'

export const CompanyPolicyUpdateManyMutation = mutationField(
  'updateManyCompanyPolicy',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CompanyPolicyUpdateManyMutationInput'),
      where: 'CompanyPolicyWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyPolicy.updateMany(args as any)
    },
  },
)

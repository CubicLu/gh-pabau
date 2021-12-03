import { mutationField, nonNull } from 'nexus'

export const CompanyBranchUpdateManyMutation = mutationField(
  'updateManyCompanyBranch',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CompanyBranchUpdateManyMutationInput'),
      where: 'CompanyBranchWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyBranch.updateMany(args as any)
    },
  },
)

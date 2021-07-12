import { mutationField, nonNull } from 'nexus'

export const CompanyBranchUpdateManyMutation = mutationField(
  'updateManyCompanyBranch',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CompanyBranchWhereInput',
      data: nonNull('CompanyBranchUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyBranch.updateMany(args as any)
    },
  },
)

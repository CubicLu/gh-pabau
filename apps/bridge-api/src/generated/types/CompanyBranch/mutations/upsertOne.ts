import { mutationField, nonNull } from 'nexus'

export const CompanyBranchUpsertOneMutation = mutationField(
  'upsertOneCompanyBranch',
  {
    type: nonNull('CompanyBranch'),
    args: {
      where: nonNull('CompanyBranchWhereUniqueInput'),
      create: nonNull('CompanyBranchCreateInput'),
      update: nonNull('CompanyBranchUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyBranch.upsert({
        ...args,
        ...select,
      })
    },
  },
)

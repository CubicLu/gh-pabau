import { mutationField, nonNull } from 'nexus'

export const CompanyBranchGroupUpsertOneMutation = mutationField(
  'upsertOneCompanyBranchGroup',
  {
    type: nonNull('CompanyBranchGroup'),
    args: {
      where: nonNull('CompanyBranchGroupWhereUniqueInput'),
      create: nonNull('CompanyBranchGroupCreateInput'),
      update: nonNull('CompanyBranchGroupUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyBranchGroup.upsert({
        ...args,
        ...select,
      })
    },
  },
)

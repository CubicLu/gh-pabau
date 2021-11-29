import { mutationField, nonNull } from 'nexus'

export const CompanyBranchUpdateOneMutation = mutationField(
  'updateOneCompanyBranch',
  {
    type: nonNull('CompanyBranch'),
    args: {
      data: nonNull('CompanyBranchUpdateInput'),
      where: nonNull('CompanyBranchWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.companyBranch.update({
        where,
        data,
        ...select,
      })
    },
  },
)

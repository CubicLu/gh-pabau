import { mutationField, nonNull } from 'nexus'

export const CompanyBranchUpdateOneMutation = mutationField(
  'updateOneCompanyBranch',
  {
    type: nonNull('CompanyBranch'),
    args: {
      where: nonNull('CompanyBranchWhereUniqueInput'),
      data: nonNull('CompanyBranchUpdateInput'),
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

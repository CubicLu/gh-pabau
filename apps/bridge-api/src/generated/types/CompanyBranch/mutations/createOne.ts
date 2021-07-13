import { mutationField, nonNull } from 'nexus'

export const CompanyBranchCreateOneMutation = mutationField(
  'createOneCompanyBranch',
  {
    type: nonNull('CompanyBranch'),
    args: {
      data: nonNull('CompanyBranchCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.companyBranch.create({
        data,
        ...select,
      })
    },
  },
)

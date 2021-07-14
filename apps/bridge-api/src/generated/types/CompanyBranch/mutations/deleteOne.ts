import { mutationField, nonNull } from 'nexus'

export const CompanyBranchDeleteOneMutation = mutationField(
  'deleteOneCompanyBranch',
  {
    type: 'CompanyBranch',
    args: {
      where: nonNull('CompanyBranchWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.companyBranch.delete({
        where,
        ...select,
      })
    },
  },
)

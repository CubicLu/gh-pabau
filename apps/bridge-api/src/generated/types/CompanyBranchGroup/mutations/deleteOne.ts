import { mutationField, nonNull } from 'nexus'

export const CompanyBranchGroupDeleteOneMutation = mutationField(
  'deleteOneCompanyBranchGroup',
  {
    type: 'CompanyBranchGroup',
    args: {
      where: nonNull('CompanyBranchGroupWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.companyBranchGroup.delete({
        where,
        ...select,
      })
    },
  },
)

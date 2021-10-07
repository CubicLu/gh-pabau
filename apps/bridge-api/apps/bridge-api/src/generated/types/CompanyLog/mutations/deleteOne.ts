import { mutationField, nonNull } from 'nexus'

export const CompanyLogDeleteOneMutation = mutationField(
  'deleteOneCompanyLog',
  {
    type: 'CompanyLog',
    args: {
      where: nonNull('CompanyLogWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.companyLog.delete({
        where,
        ...select,
      })
    },
  },
)

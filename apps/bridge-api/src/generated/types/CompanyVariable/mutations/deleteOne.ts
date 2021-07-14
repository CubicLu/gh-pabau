import { mutationField, nonNull } from 'nexus'

export const CompanyVariableDeleteOneMutation = mutationField(
  'deleteOneCompanyVariable',
  {
    type: 'CompanyVariable',
    args: {
      where: nonNull('CompanyVariableWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.companyVariable.delete({
        where,
        ...select,
      })
    },
  },
)

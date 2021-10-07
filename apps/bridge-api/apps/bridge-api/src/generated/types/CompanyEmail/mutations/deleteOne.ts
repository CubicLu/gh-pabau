import { mutationField, nonNull } from 'nexus'

export const CompanyEmailDeleteOneMutation = mutationField(
  'deleteOneCompanyEmail',
  {
    type: 'CompanyEmail',
    args: {
      where: nonNull('CompanyEmailWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.companyEmail.delete({
        where,
        ...select,
      })
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const CompanyServiceDeleteOneMutation = mutationField(
  'deleteOneCompanyService',
  {
    type: 'CompanyService',
    args: {
      where: nonNull('CompanyServiceWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.companyService.delete({
        where,
        ...select,
      })
    },
  },
)

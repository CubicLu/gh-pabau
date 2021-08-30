import { mutationField, nonNull } from 'nexus'

export const CompanyDetailsDeleteOneMutation = mutationField(
  'deleteOneCompanyDetails',
  {
    type: 'CompanyDetails',
    args: {
      where: nonNull('CompanyDetailsWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.companyDetails.delete({
        where,
        ...select,
      })
    },
  },
)

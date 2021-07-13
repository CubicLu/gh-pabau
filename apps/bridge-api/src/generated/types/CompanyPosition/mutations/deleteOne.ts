import { mutationField, nonNull } from 'nexus'

export const CompanyPositionDeleteOneMutation = mutationField(
  'deleteOneCompanyPosition',
  {
    type: 'CompanyPosition',
    args: {
      where: nonNull('CompanyPositionWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.companyPosition.delete({
        where,
        ...select,
      })
    },
  },
)

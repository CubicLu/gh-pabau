import { mutationField, nonNull } from 'nexus'

export const CompanyLocationDeleteOneMutation = mutationField(
  'deleteOneCompanyLocation',
  {
    type: 'CompanyLocation',
    args: {
      where: nonNull('CompanyLocationWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.companyLocation.delete({
        where,
        ...select,
      })
    },
  },
)

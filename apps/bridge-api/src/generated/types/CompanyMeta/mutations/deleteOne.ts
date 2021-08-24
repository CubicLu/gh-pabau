import { mutationField, nonNull } from 'nexus'

export const CompanyMetaDeleteOneMutation = mutationField(
  'deleteOneCompanyMeta',
  {
    type: 'CompanyMeta',
    args: {
      where: nonNull('CompanyMetaWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.companyMeta.delete({
        where,
        ...select,
      })
    },
  },
)

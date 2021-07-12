import { mutationField, nonNull } from 'nexus'

export const IssuingCompanyDeleteOneMutation = mutationField(
  'deleteOneIssuingCompany',
  {
    type: 'IssuingCompany',
    args: {
      where: nonNull('IssuingCompanyWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.issuingCompany.delete({
        where,
        ...select,
      })
    },
  },
)

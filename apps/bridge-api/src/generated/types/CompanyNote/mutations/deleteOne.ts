import { mutationField, nonNull } from 'nexus'

export const CompanyNoteDeleteOneMutation = mutationField(
  'deleteOneCompanyNote',
  {
    type: 'CompanyNote',
    args: {
      where: nonNull('CompanyNoteWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.companyNote.delete({
        where,
        ...select,
      })
    },
  },
)

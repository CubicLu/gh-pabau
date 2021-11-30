import { mutationField, nonNull } from 'nexus'

export const CompanyNoteUpdateOneMutation = mutationField(
  'updateOneCompanyNote',
  {
    type: nonNull('CompanyNote'),
    args: {
      data: nonNull('CompanyNoteUpdateInput'),
      where: nonNull('CompanyNoteWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.companyNote.update({
        where,
        data,
        ...select,
      })
    },
  },
)

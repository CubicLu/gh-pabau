import { mutationField, nonNull } from 'nexus'

export const CompanyNoteUpdateOneMutation = mutationField(
  'updateOneCompanyNote',
  {
    type: nonNull('CompanyNote'),
    args: {
      where: nonNull('CompanyNoteWhereUniqueInput'),
      data: nonNull('CompanyNoteUpdateInput'),
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

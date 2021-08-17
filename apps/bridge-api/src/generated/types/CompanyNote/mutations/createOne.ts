import { mutationField, nonNull } from 'nexus'

export const CompanyNoteCreateOneMutation = mutationField(
  'createOneCompanyNote',
  {
    type: nonNull('CompanyNote'),
    args: {
      data: nonNull('CompanyNoteCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.companyNote.create({
        data,
        ...select,
      })
    },
  },
)

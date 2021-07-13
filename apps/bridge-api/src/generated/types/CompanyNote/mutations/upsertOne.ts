import { mutationField, nonNull } from 'nexus'

export const CompanyNoteUpsertOneMutation = mutationField(
  'upsertOneCompanyNote',
  {
    type: nonNull('CompanyNote'),
    args: {
      where: nonNull('CompanyNoteWhereUniqueInput'),
      create: nonNull('CompanyNoteCreateInput'),
      update: nonNull('CompanyNoteUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyNote.upsert({
        ...args,
        ...select,
      })
    },
  },
)

import { queryField, nonNull } from 'nexus'

export const CompanyNoteFindUniqueQuery = queryField('findUniqueCompanyNote', {
  type: 'CompanyNote',
  args: {
    where: nonNull('CompanyNoteWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.companyNote.findUnique({
      where,
      ...select,
    })
  },
})

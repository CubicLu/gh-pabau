import { queryField, list } from 'nexus'

export const CompanyNoteFindFirstQuery = queryField('findFirstCompanyNote', {
  type: 'CompanyNote',
  args: {
    where: 'CompanyNoteWhereInput',
    orderBy: list('CompanyNoteOrderByWithRelationInput'),
    cursor: 'CompanyNoteWhereUniqueInput',
    distinct: 'CompanyNoteScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.companyNote.findFirst({
      ...args,
      ...select,
    })
  },
})

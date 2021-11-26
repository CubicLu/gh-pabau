import { queryField, list } from 'nexus'

export const CompanyNoteFindFirstQuery = queryField('findFirstCompanyNote', {
  type: 'CompanyNote',
  args: {
    where: 'CompanyNoteWhereInput',
    orderBy: list('CompanyNoteOrderByWithRelationInput'),
    cursor: 'CompanyNoteWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CompanyNoteScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.companyNote.findFirst({
      ...args,
      ...select,
    })
  },
})

import { queryField, nonNull, list } from 'nexus'

export const CompanyNoteFindManyQuery = queryField('findManyCompanyNote', {
  type: nonNull(list(nonNull('CompanyNote'))),
  args: {
    where: 'CompanyNoteWhereInput',
    orderBy: list('CompanyNoteOrderByWithRelationInput'),
    cursor: 'CompanyNoteWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CompanyNoteScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.companyNote.findMany({
      ...args,
      ...select,
    })
  },
})

import { queryField, nonNull, list } from 'nexus'

export const CompanyNoteFindManyQuery = queryField('findManyCompanyNote', {
  type: nonNull(list(nonNull('CompanyNote'))),
  args: {
    where: 'CompanyNoteWhereInput',
    orderBy: list('CompanyNoteOrderByInput'),
    cursor: 'CompanyNoteWhereUniqueInput',
    distinct: 'CompanyNoteScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.companyNote.findMany({
      ...args,
      ...select,
    })
  },
})

import { queryField, list } from 'nexus'

export const CompanyNoteAggregateQuery = queryField('aggregateCompanyNote', {
  type: 'AggregateCompanyNote',
  args: {
    where: 'CompanyNoteWhereInput',
    orderBy: list('CompanyNoteOrderByWithRelationInput'),
    cursor: 'CompanyNoteWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.companyNote.aggregate({ ...args, ...select }) as any
  },
})

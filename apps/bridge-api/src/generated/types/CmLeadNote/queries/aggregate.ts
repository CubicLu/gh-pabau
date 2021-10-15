import { queryField, list } from 'nexus'

export const CmLeadNoteAggregateQuery = queryField('aggregateCmLeadNote', {
  type: 'AggregateCmLeadNote',
  args: {
    where: 'CmLeadNoteWhereInput',
    orderBy: list('CmLeadNoteOrderByInput'),
    cursor: 'CmLeadNoteWhereUniqueInput',
    distinct: 'CmLeadNoteScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmLeadNote.aggregate({ ...args, ...select }) as any
  },
})

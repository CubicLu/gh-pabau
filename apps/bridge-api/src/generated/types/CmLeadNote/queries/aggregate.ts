import { queryField, list } from 'nexus'

export const CmLeadNoteAggregateQuery = queryField('aggregateCmLeadNote', {
  type: 'AggregateCmLeadNote',
  args: {
    where: 'CmLeadNoteWhereInput',
    orderBy: list('CmLeadNoteOrderByWithRelationInput'),
    cursor: 'CmLeadNoteWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmLeadNote.aggregate({ ...args, ...select }) as any
  },
})

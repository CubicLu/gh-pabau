import { queryField, list } from 'nexus'

export const ClassNotesAggregateQuery = queryField('aggregateClassNotes', {
  type: 'AggregateClassNotes',
  args: {
    where: 'ClassNotesWhereInput',
    orderBy: list('ClassNotesOrderByWithRelationInput'),
    cursor: 'ClassNotesWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.classNotes.aggregate({ ...args, ...select }) as any
  },
})

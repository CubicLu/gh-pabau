import { queryField, list } from 'nexus'

export const ContactNoteAggregateQuery = queryField('aggregateContactNote', {
  type: 'AggregateContactNote',
  args: {
    where: 'ContactNoteWhereInput',
    orderBy: list('ContactNoteOrderByWithRelationInput'),
    cursor: 'ContactNoteWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.contactNote.aggregate({ ...args, ...select }) as any
  },
})

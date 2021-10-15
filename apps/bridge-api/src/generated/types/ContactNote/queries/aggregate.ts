import { queryField, list } from 'nexus'

export const ContactNoteAggregateQuery = queryField('aggregateContactNote', {
  type: 'AggregateContactNote',
  args: {
    where: 'ContactNoteWhereInput',
    orderBy: list('ContactNoteOrderByInput'),
    cursor: 'ContactNoteWhereUniqueInput',
    distinct: 'ContactNoteScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.contactNote.aggregate({ ...args, ...select }) as any
  },
})

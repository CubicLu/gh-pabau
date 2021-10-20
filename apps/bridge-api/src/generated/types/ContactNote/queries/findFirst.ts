import { queryField, list } from 'nexus'

export const ContactNoteFindFirstQuery = queryField('findFirstContactNote', {
  type: 'ContactNote',
  args: {
    where: 'ContactNoteWhereInput',
    orderBy: list('ContactNoteOrderByWithRelationInput'),
    cursor: 'ContactNoteWhereUniqueInput',
    distinct: 'ContactNoteScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.contactNote.findFirst({
      ...args,
      ...select,
    })
  },
})

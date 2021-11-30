import { queryField, nonNull, list } from 'nexus'

export const ContactNoteFindManyQuery = queryField('findManyContactNote', {
  type: nonNull(list(nonNull('ContactNote'))),
  args: {
    where: 'ContactNoteWhereInput',
    orderBy: list('ContactNoteOrderByWithRelationInput'),
    cursor: 'ContactNoteWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('ContactNoteScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.contactNote.findMany({
      ...args,
      ...select,
    })
  },
})

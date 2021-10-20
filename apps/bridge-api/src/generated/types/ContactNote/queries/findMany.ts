import { queryField, nonNull, list } from 'nexus'

export const ContactNoteFindManyQuery = queryField('findManyContactNote', {
  type: nonNull(list(nonNull('ContactNote'))),
  args: {
    where: 'ContactNoteWhereInput',
    orderBy: list('ContactNoteOrderByWithRelationInput'),
    cursor: 'ContactNoteWhereUniqueInput',
    distinct: 'ContactNoteScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.contactNote.findMany({
      ...args,
      ...select,
    })
  },
})

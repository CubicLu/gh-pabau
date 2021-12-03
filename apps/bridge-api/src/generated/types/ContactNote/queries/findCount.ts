import { queryField, nonNull, list } from 'nexus'

export const ContactNoteFindCountQuery = queryField(
  'findManyContactNoteCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ContactNoteWhereInput',
      orderBy: list('ContactNoteOrderByWithRelationInput'),
      cursor: 'ContactNoteWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ContactNoteScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.contactNote.count(args as any)
    },
  },
)

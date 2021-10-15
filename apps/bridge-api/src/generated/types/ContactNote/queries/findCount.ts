import { queryField, nonNull, list } from 'nexus'

export const ContactNoteFindCountQuery = queryField(
  'findManyContactNoteCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ContactNoteWhereInput',
      orderBy: list('ContactNoteOrderByInput'),
      cursor: 'ContactNoteWhereUniqueInput',
      distinct: 'ContactNoteScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.contactNote.count(args as any)
    },
  },
)

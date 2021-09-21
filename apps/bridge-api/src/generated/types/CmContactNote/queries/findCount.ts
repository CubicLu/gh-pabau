import { queryField, nonNull, list } from 'nexus'

export const CmContactNoteFindCountQuery = queryField(
  'findManyCmContactNoteCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmContactNoteWhereInput',
      orderBy: list('CmContactNoteOrderByWithRelationInput'),
      cursor: 'CmContactNoteWhereUniqueInput',
      distinct: 'CmContactNoteScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmContactNote.count(args as any)
    },
  },
)

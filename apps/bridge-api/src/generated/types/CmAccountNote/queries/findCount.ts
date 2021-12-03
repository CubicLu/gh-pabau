import { queryField, nonNull, list } from 'nexus'

export const CmAccountNoteFindCountQuery = queryField(
  'findManyCmAccountNoteCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmAccountNoteWhereInput',
      orderBy: list('CmAccountNoteOrderByWithRelationInput'),
      cursor: 'CmAccountNoteWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmAccountNoteScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmAccountNote.count(args as any)
    },
  },
)

import { queryField, nonNull, list } from 'nexus'

export const CmAccountNoteFindCountQuery = queryField(
  'findManyCmAccountNoteCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmAccountNoteWhereInput',
      orderBy: list('CmAccountNoteOrderByWithRelationInput'),
      cursor: 'CmAccountNoteWhereUniqueInput',
      distinct: 'CmAccountNoteScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmAccountNote.count(args as any)
    },
  },
)

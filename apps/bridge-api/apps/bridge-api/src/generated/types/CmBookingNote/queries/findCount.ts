import { queryField, nonNull, list } from 'nexus'

export const CmBookingNoteFindCountQuery = queryField(
  'findManyCmBookingNoteCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmBookingNoteWhereInput',
      orderBy: list('CmBookingNoteOrderByWithRelationInput'),
      cursor: 'CmBookingNoteWhereUniqueInput',
      distinct: 'CmBookingNoteScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmBookingNote.count(args as any)
    },
  },
)

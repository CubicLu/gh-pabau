import { queryField, nonNull, list } from 'nexus'

export const CmBookingNoteFindCountQuery = queryField(
  'findManyCmBookingNoteCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmBookingNoteWhereInput',
      orderBy: list('CmBookingNoteOrderByWithRelationInput'),
      cursor: 'CmBookingNoteWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmBookingNoteScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmBookingNote.count(args as any)
    },
  },
)

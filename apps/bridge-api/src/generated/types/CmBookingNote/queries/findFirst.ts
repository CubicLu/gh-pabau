import { queryField, list } from 'nexus'

export const CmBookingNoteFindFirstQuery = queryField(
  'findFirstCmBookingNote',
  {
    type: 'CmBookingNote',
    args: {
      where: 'CmBookingNoteWhereInput',
      orderBy: list('CmBookingNoteOrderByWithRelationInput'),
      cursor: 'CmBookingNoteWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmBookingNoteScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmBookingNote.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

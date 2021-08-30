import { queryField, list } from 'nexus'

export const CmBookingNoteFindFirstQuery = queryField(
  'findFirstCmBookingNote',
  {
    type: 'CmBookingNote',
    args: {
      where: 'CmBookingNoteWhereInput',
      orderBy: list('CmBookingNoteOrderByInput'),
      cursor: 'CmBookingNoteWhereUniqueInput',
      distinct: 'CmBookingNoteScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmBookingNote.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

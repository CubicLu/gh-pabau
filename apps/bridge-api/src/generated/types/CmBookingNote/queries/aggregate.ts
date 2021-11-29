import { queryField, list } from 'nexus'

export const CmBookingNoteAggregateQuery = queryField(
  'aggregateCmBookingNote',
  {
    type: 'AggregateCmBookingNote',
    args: {
      where: 'CmBookingNoteWhereInput',
      orderBy: list('CmBookingNoteOrderByWithRelationInput'),
      cursor: 'CmBookingNoteWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmBookingNote.aggregate({ ...args, ...select }) as any
    },
  },
)

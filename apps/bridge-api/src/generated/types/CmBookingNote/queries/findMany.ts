import { queryField, nonNull, list } from 'nexus'

export const CmBookingNoteFindManyQuery = queryField('findManyCmBookingNote', {
  type: nonNull(list(nonNull('CmBookingNote'))),
  args: {
    where: 'CmBookingNoteWhereInput',
    orderBy: list('CmBookingNoteOrderByWithRelationInput'),
    cursor: 'CmBookingNoteWhereUniqueInput',
    distinct: 'CmBookingNoteScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmBookingNote.findMany({
      ...args,
      ...select,
    })
  },
})

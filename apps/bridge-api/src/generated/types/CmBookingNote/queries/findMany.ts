import { queryField, nonNull, list } from 'nexus'

export const CmBookingNoteFindManyQuery = queryField('findManyCmBookingNote', {
  type: nonNull(list(nonNull('CmBookingNote'))),
  args: {
    where: 'CmBookingNoteWhereInput',
    orderBy: list('CmBookingNoteOrderByWithRelationInput'),
    cursor: 'CmBookingNoteWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmBookingNoteScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmBookingNote.findMany({
      ...args,
      ...select,
    })
  },
})

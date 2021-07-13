import { queryField, nonNull } from 'nexus'

export const CmBookingNoteFindUniqueQuery = queryField(
  'findUniqueCmBookingNote',
  {
    type: 'CmBookingNote',
    args: {
      where: nonNull('CmBookingNoteWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.cmBookingNote.findUnique({
        where,
        ...select,
      })
    },
  },
)

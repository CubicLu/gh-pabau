import { mutationField, nonNull } from 'nexus'

export const CmBookingNoteUpdateOneMutation = mutationField(
  'updateOneCmBookingNote',
  {
    type: nonNull('CmBookingNote'),
    args: {
      where: nonNull('CmBookingNoteWhereUniqueInput'),
      data: nonNull('CmBookingNoteUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmBookingNote.update({
        where,
        data,
        ...select,
      })
    },
  },
)

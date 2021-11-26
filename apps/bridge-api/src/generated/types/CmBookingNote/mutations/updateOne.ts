import { mutationField, nonNull } from 'nexus'

export const CmBookingNoteUpdateOneMutation = mutationField(
  'updateOneCmBookingNote',
  {
    type: nonNull('CmBookingNote'),
    args: {
      data: nonNull('CmBookingNoteUpdateInput'),
      where: nonNull('CmBookingNoteWhereUniqueInput'),
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

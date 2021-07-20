import { mutationField, nonNull } from 'nexus'

export const CmBookingNoteCreateOneMutation = mutationField(
  'createOneCmBookingNote',
  {
    type: nonNull('CmBookingNote'),
    args: {
      data: nonNull('CmBookingNoteCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cmBookingNote.create({
        data,
        ...select,
      })
    },
  },
)

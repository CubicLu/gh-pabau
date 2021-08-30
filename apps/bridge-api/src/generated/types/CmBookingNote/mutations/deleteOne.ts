import { mutationField, nonNull } from 'nexus'

export const CmBookingNoteDeleteOneMutation = mutationField(
  'deleteOneCmBookingNote',
  {
    type: 'CmBookingNote',
    args: {
      where: nonNull('CmBookingNoteWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cmBookingNote.delete({
        where,
        ...select,
      })
    },
  },
)

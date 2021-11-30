import { mutationField, nonNull } from 'nexus'

export const CmBookingNoteUpdateManyMutation = mutationField(
  'updateManyCmBookingNote',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CmBookingNoteUpdateManyMutationInput'),
      where: 'CmBookingNoteWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmBookingNote.updateMany(args as any)
    },
  },
)

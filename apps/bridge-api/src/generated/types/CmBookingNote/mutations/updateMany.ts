import { mutationField, nonNull } from 'nexus'

export const CmBookingNoteUpdateManyMutation = mutationField(
  'updateManyCmBookingNote',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CmBookingNoteWhereInput',
      data: nonNull('CmBookingNoteUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmBookingNote.updateMany(args as any)
    },
  },
)

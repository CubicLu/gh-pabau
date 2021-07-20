import { mutationField, nonNull } from 'nexus'

export const CmBookingNoteUpsertOneMutation = mutationField(
  'upsertOneCmBookingNote',
  {
    type: nonNull('CmBookingNote'),
    args: {
      where: nonNull('CmBookingNoteWhereUniqueInput'),
      create: nonNull('CmBookingNoteCreateInput'),
      update: nonNull('CmBookingNoteUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmBookingNote.upsert({
        ...args,
        ...select,
      })
    },
  },
)

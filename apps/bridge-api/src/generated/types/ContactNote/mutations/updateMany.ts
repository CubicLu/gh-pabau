import { mutationField, nonNull } from 'nexus'

export const ContactNoteUpdateManyMutation = mutationField(
  'updateManyContactNote',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ContactNoteWhereInput',
      data: nonNull('ContactNoteUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.contactNote.updateMany(args as any)
    },
  },
)

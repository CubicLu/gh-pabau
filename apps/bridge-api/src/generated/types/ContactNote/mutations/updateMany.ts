import { mutationField, nonNull } from 'nexus'

export const ContactNoteUpdateManyMutation = mutationField(
  'updateManyContactNote',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ContactNoteUpdateManyMutationInput'),
      where: 'ContactNoteWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.contactNote.updateMany(args as any)
    },
  },
)

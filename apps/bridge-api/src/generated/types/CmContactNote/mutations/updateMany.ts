import { mutationField, nonNull } from 'nexus'

export const CmContactNoteUpdateManyMutation = mutationField(
  'updateManyCmContactNote',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CmContactNoteWhereInput',
      data: nonNull('CmContactNoteUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmContactNote.updateMany(args as any)
    },
  },
)

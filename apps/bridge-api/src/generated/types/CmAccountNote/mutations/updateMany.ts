import { mutationField, nonNull } from 'nexus'

export const CmAccountNoteUpdateManyMutation = mutationField(
  'updateManyCmAccountNote',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CmAccountNoteUpdateManyMutationInput'),
      where: 'CmAccountNoteWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmAccountNote.updateMany(args as any)
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const CmAccountNoteUpdateManyMutation = mutationField(
  'updateManyCmAccountNote',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CmAccountNoteWhereInput',
      data: nonNull('CmAccountNoteUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmAccountNote.updateMany(args as any)
    },
  },
)

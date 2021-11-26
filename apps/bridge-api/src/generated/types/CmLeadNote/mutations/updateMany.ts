import { mutationField, nonNull } from 'nexus'

export const CmLeadNoteUpdateManyMutation = mutationField(
  'updateManyCmLeadNote',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CmLeadNoteUpdateManyMutationInput'),
      where: 'CmLeadNoteWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmLeadNote.updateMany(args as any)
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const CmLeadNoteUpdateManyMutation = mutationField(
  'updateManyCmLeadNote',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CmLeadNoteWhereInput',
      data: nonNull('CmLeadNoteUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmLeadNote.updateMany(args as any)
    },
  },
)

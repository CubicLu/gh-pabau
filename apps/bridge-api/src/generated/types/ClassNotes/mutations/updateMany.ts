import { mutationField, nonNull } from 'nexus'

export const ClassNotesUpdateManyMutation = mutationField(
  'updateManyClassNotes',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ClassNotesUpdateManyMutationInput'),
      where: 'ClassNotesWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.classNotes.updateMany(args as any)
    },
  },
)

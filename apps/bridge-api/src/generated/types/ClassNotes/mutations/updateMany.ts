import { mutationField, nonNull } from 'nexus'

export const ClassNotesUpdateManyMutation = mutationField(
  'updateManyClassNotes',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ClassNotesWhereInput',
      data: nonNull('ClassNotesUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.classNotes.updateMany(args as any)
    },
  },
)

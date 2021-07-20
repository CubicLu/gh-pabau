import { mutationField, nonNull } from 'nexus'

export const ClassNotesUpsertOneMutation = mutationField(
  'upsertOneClassNotes',
  {
    type: nonNull('ClassNotes'),
    args: {
      where: nonNull('ClassNotesWhereUniqueInput'),
      create: nonNull('ClassNotesCreateInput'),
      update: nonNull('ClassNotesUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.classNotes.upsert({
        ...args,
        ...select,
      })
    },
  },
)

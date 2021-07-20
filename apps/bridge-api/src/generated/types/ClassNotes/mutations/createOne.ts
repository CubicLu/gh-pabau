import { mutationField, nonNull } from 'nexus'

export const ClassNotesCreateOneMutation = mutationField(
  'createOneClassNotes',
  {
    type: nonNull('ClassNotes'),
    args: {
      data: nonNull('ClassNotesCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.classNotes.create({
        data,
        ...select,
      })
    },
  },
)

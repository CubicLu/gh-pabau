import { mutationField, nonNull } from 'nexus'

export const ClassNotesUpdateOneMutation = mutationField(
  'updateOneClassNotes',
  {
    type: nonNull('ClassNotes'),
    args: {
      data: nonNull('ClassNotesUpdateInput'),
      where: nonNull('ClassNotesWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.classNotes.update({
        where,
        data,
        ...select,
      })
    },
  },
)

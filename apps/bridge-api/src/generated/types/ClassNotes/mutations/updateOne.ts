import { mutationField, nonNull } from 'nexus'

export const ClassNotesUpdateOneMutation = mutationField(
  'updateOneClassNotes',
  {
    type: nonNull('ClassNotes'),
    args: {
      where: nonNull('ClassNotesWhereUniqueInput'),
      data: nonNull('ClassNotesUpdateInput'),
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

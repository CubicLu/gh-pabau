import { mutationField, nonNull } from 'nexus'

export const ClassNotesDeleteOneMutation = mutationField(
  'deleteOneClassNotes',
  {
    type: 'ClassNotes',
    args: {
      where: nonNull('ClassNotesWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.classNotes.delete({
        where,
        ...select,
      })
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const CmContactNoteDeleteOneMutation = mutationField(
  'deleteOneCmContactNote',
  {
    type: 'CmContactNote',
    args: {
      where: nonNull('CmContactNoteWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cmContactNote.delete({
        where,
        ...select,
      })
    },
  },
)

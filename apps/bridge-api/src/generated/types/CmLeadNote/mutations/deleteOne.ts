import { mutationField, nonNull } from 'nexus'

export const CmLeadNoteDeleteOneMutation = mutationField(
  'deleteOneCmLeadNote',
  {
    type: 'CmLeadNote',
    args: {
      where: nonNull('CmLeadNoteWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cmLeadNote.delete({
        where,
        ...select,
      })
    },
  },
)

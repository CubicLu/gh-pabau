import { mutationField, nonNull } from 'nexus'

export const CmAccountNoteDeleteOneMutation = mutationField(
  'deleteOneCmAccountNote',
  {
    type: 'CmAccountNote',
    args: {
      where: nonNull('CmAccountNoteWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cmAccountNote.delete({
        where,
        ...select,
      })
    },
  },
)

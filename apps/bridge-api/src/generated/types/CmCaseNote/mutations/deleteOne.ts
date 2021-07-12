import { mutationField, nonNull } from 'nexus'

export const CmCaseNoteDeleteOneMutation = mutationField(
  'deleteOneCmCaseNote',
  {
    type: 'CmCaseNote',
    args: {
      where: nonNull('CmCaseNoteWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cmCaseNote.delete({
        where,
        ...select,
      })
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const ContactNoteDeleteOneMutation = mutationField(
  'deleteOneContactNote',
  {
    type: 'ContactNote',
    args: {
      where: nonNull('ContactNoteWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.contactNote.delete({
        where,
        ...select,
      })
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const ContactNoteUpdateOneMutation = mutationField(
  'updateOneContactNote',
  {
    type: nonNull('ContactNote'),
    args: {
      data: nonNull('ContactNoteUpdateInput'),
      where: nonNull('ContactNoteWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.contactNote.update({
        where,
        data,
        ...select,
      })
    },
  },
)

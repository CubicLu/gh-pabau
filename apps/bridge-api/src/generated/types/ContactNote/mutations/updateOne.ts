import { mutationField, nonNull } from 'nexus'

export const ContactNoteUpdateOneMutation = mutationField(
  'updateOneContactNote',
  {
    type: nonNull('ContactNote'),
    args: {
      where: nonNull('ContactNoteWhereUniqueInput'),
      data: nonNull('ContactNoteUpdateInput'),
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

import { mutationField, nonNull } from 'nexus'

export const ContactNoteCreateOneMutation = mutationField(
  'createOneContactNote',
  {
    type: nonNull('ContactNote'),
    args: {
      data: nonNull('ContactNoteCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.contactNote.create({
        data,
        ...select,
      })
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const ContactNoteUpsertOneMutation = mutationField(
  'upsertOneContactNote',
  {
    type: nonNull('ContactNote'),
    args: {
      where: nonNull('ContactNoteWhereUniqueInput'),
      create: nonNull('ContactNoteCreateInput'),
      update: nonNull('ContactNoteUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactNote.upsert({
        ...args,
        ...select,
      })
    },
  },
)

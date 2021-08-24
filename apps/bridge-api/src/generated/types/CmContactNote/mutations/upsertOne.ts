import { mutationField, nonNull } from 'nexus'

export const CmContactNoteUpsertOneMutation = mutationField(
  'upsertOneCmContactNote',
  {
    type: nonNull('CmContactNote'),
    args: {
      where: nonNull('CmContactNoteWhereUniqueInput'),
      create: nonNull('CmContactNoteCreateInput'),
      update: nonNull('CmContactNoteUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactNote.upsert({
        ...args,
        ...select,
      })
    },
  },
)

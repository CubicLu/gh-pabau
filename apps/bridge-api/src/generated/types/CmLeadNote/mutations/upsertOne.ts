import { mutationField, nonNull } from 'nexus'

export const CmLeadNoteUpsertOneMutation = mutationField(
  'upsertOneCmLeadNote',
  {
    type: nonNull('CmLeadNote'),
    args: {
      where: nonNull('CmLeadNoteWhereUniqueInput'),
      create: nonNull('CmLeadNoteCreateInput'),
      update: nonNull('CmLeadNoteUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmLeadNote.upsert({
        ...args,
        ...select,
      })
    },
  },
)

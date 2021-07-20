import { mutationField, nonNull } from 'nexus'

export const CmCaseNoteUpsertOneMutation = mutationField(
  'upsertOneCmCaseNote',
  {
    type: nonNull('CmCaseNote'),
    args: {
      where: nonNull('CmCaseNoteWhereUniqueInput'),
      create: nonNull('CmCaseNoteCreateInput'),
      update: nonNull('CmCaseNoteUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmCaseNote.upsert({
        ...args,
        ...select,
      })
    },
  },
)

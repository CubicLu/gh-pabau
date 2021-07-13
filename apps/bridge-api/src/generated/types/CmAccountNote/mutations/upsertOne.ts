import { mutationField, nonNull } from 'nexus'

export const CmAccountNoteUpsertOneMutation = mutationField(
  'upsertOneCmAccountNote',
  {
    type: nonNull('CmAccountNote'),
    args: {
      where: nonNull('CmAccountNoteWhereUniqueInput'),
      create: nonNull('CmAccountNoteCreateInput'),
      update: nonNull('CmAccountNoteUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmAccountNote.upsert({
        ...args,
        ...select,
      })
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const CmContactNoteUpdateOneMutation = mutationField(
  'updateOneCmContactNote',
  {
    type: nonNull('CmContactNote'),
    args: {
      where: nonNull('CmContactNoteWhereUniqueInput'),
      data: nonNull('CmContactNoteUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmContactNote.update({
        where,
        data,
        ...select,
      })
    },
  },
)

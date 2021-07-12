import { mutationField, nonNull } from 'nexus'

export const CmContactNoteCreateOneMutation = mutationField(
  'createOneCmContactNote',
  {
    type: nonNull('CmContactNote'),
    args: {
      data: nonNull('CmContactNoteCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cmContactNote.create({
        data,
        ...select,
      })
    },
  },
)

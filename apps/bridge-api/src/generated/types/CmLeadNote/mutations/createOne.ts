import { mutationField, nonNull } from 'nexus'

export const CmLeadNoteCreateOneMutation = mutationField(
  'createOneCmLeadNote',
  {
    type: nonNull('CmLeadNote'),
    args: {
      data: nonNull('CmLeadNoteCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cmLeadNote.create({
        data,
        ...select,
      })
    },
  },
)

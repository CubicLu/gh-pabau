import { mutationField, nonNull } from 'nexus'

export const CmLeadNoteUpdateOneMutation = mutationField(
  'updateOneCmLeadNote',
  {
    type: nonNull('CmLeadNote'),
    args: {
      data: nonNull('CmLeadNoteUpdateInput'),
      where: nonNull('CmLeadNoteWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmLeadNote.update({
        where,
        data,
        ...select,
      })
    },
  },
)

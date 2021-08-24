import { mutationField, nonNull } from 'nexus'

export const CmLeadNoteUpdateOneMutation = mutationField(
  'updateOneCmLeadNote',
  {
    type: nonNull('CmLeadNote'),
    args: {
      where: nonNull('CmLeadNoteWhereUniqueInput'),
      data: nonNull('CmLeadNoteUpdateInput'),
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

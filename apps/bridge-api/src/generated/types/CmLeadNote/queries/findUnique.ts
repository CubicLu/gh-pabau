import { queryField, nonNull } from 'nexus'

export const CmLeadNoteFindUniqueQuery = queryField('findUniqueCmLeadNote', {
  type: 'CmLeadNote',
  args: {
    where: nonNull('CmLeadNoteWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.cmLeadNote.findUnique({
      where,
      ...select,
    })
  },
})

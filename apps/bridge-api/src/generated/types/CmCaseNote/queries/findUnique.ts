import { queryField, nonNull } from 'nexus'

export const CmCaseNoteFindUniqueQuery = queryField('findUniqueCmCaseNote', {
  type: 'CmCaseNote',
  args: {
    where: nonNull('CmCaseNoteWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.cmCaseNote.findUnique({
      where,
      ...select,
    })
  },
})

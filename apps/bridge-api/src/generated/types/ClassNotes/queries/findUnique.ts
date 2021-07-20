import { queryField, nonNull } from 'nexus'

export const ClassNotesFindUniqueQuery = queryField('findUniqueClassNotes', {
  type: 'ClassNotes',
  args: {
    where: nonNull('ClassNotesWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.classNotes.findUnique({
      where,
      ...select,
    })
  },
})

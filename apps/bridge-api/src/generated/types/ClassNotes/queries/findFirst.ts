import { queryField, list } from 'nexus'

export const ClassNotesFindFirstQuery = queryField('findFirstClassNotes', {
  type: 'ClassNotes',
  args: {
    where: 'ClassNotesWhereInput',
    orderBy: list('ClassNotesOrderByWithRelationInput'),
    cursor: 'ClassNotesWhereUniqueInput',
    distinct: 'ClassNotesScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.classNotes.findFirst({
      ...args,
      ...select,
    })
  },
})

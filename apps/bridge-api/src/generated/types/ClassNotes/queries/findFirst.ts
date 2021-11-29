import { queryField, list } from 'nexus'

export const ClassNotesFindFirstQuery = queryField('findFirstClassNotes', {
  type: 'ClassNotes',
  args: {
    where: 'ClassNotesWhereInput',
    orderBy: list('ClassNotesOrderByWithRelationInput'),
    cursor: 'ClassNotesWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('ClassNotesScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.classNotes.findFirst({
      ...args,
      ...select,
    })
  },
})

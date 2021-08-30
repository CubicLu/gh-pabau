import { queryField, nonNull, list } from 'nexus'

export const ClassNotesFindManyQuery = queryField('findManyClassNotes', {
  type: nonNull(list(nonNull('ClassNotes'))),
  args: {
    where: 'ClassNotesWhereInput',
    orderBy: list('ClassNotesOrderByInput'),
    cursor: 'ClassNotesWhereUniqueInput',
    distinct: 'ClassNotesScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.classNotes.findMany({
      ...args,
      ...select,
    })
  },
})

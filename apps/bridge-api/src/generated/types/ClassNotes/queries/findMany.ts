import { queryField, nonNull, list } from 'nexus'

export const ClassNotesFindManyQuery = queryField('findManyClassNotes', {
  type: nonNull(list(nonNull('ClassNotes'))),
  args: {
    where: 'ClassNotesWhereInput',
    orderBy: list('ClassNotesOrderByWithRelationInput'),
    cursor: 'ClassNotesWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('ClassNotesScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.classNotes.findMany({
      ...args,
      ...select,
    })
  },
})

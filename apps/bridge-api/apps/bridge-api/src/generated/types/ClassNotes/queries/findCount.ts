import { queryField, nonNull, list } from 'nexus'

export const ClassNotesFindCountQuery = queryField('findManyClassNotesCount', {
  type: nonNull('Int'),
  args: {
    where: 'ClassNotesWhereInput',
    orderBy: list('ClassNotesOrderByWithRelationInput'),
    cursor: 'ClassNotesWhereUniqueInput',
    distinct: 'ClassNotesScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.classNotes.count(args as any)
  },
})

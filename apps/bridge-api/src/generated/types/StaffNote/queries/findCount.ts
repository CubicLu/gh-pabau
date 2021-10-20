import { queryField, nonNull, list } from 'nexus'

export const StaffNoteFindCountQuery = queryField('findManyStaffNoteCount', {
  type: nonNull('Int'),
  args: {
    where: 'StaffNoteWhereInput',
    orderBy: list('StaffNoteOrderByWithRelationInput'),
    cursor: 'StaffNoteWhereUniqueInput',
    distinct: 'StaffNoteScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.staffNote.count(args as any)
  },
})

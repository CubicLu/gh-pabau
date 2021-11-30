import { queryField, nonNull, list } from 'nexus'

export const StaffNoteFindCountQuery = queryField('findManyStaffNoteCount', {
  type: nonNull('Int'),
  args: {
    where: 'StaffNoteWhereInput',
    orderBy: list('StaffNoteOrderByWithRelationInput'),
    cursor: 'StaffNoteWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('StaffNoteScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.staffNote.count(args as any)
  },
})

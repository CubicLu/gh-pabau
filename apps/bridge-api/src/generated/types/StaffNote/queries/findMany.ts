import { queryField, nonNull, list } from 'nexus'

export const StaffNoteFindManyQuery = queryField('findManyStaffNote', {
  type: nonNull(list(nonNull('StaffNote'))),
  args: {
    where: 'StaffNoteWhereInput',
    orderBy: list('StaffNoteOrderByWithRelationInput'),
    cursor: 'StaffNoteWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('StaffNoteScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.staffNote.findMany({
      ...args,
      ...select,
    })
  },
})

import { queryField, nonNull, list } from 'nexus'

export const StaffNoteFindManyQuery = queryField('findManyStaffNote', {
  type: nonNull(list(nonNull('StaffNote'))),
  args: {
    where: 'StaffNoteWhereInput',
    orderBy: list('StaffNoteOrderByInput'),
    cursor: 'StaffNoteWhereUniqueInput',
    distinct: 'StaffNoteScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.staffNote.findMany({
      ...args,
      ...select,
    })
  },
})

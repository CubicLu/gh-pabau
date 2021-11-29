import { queryField, list } from 'nexus'

export const StaffNoteFindFirstQuery = queryField('findFirstStaffNote', {
  type: 'StaffNote',
  args: {
    where: 'StaffNoteWhereInput',
    orderBy: list('StaffNoteOrderByWithRelationInput'),
    cursor: 'StaffNoteWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('StaffNoteScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.staffNote.findFirst({
      ...args,
      ...select,
    })
  },
})

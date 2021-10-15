import { queryField, list } from 'nexus'

export const StaffNoteFindFirstQuery = queryField('findFirstStaffNote', {
  type: 'StaffNote',
  args: {
    where: 'StaffNoteWhereInput',
    orderBy: list('StaffNoteOrderByInput'),
    cursor: 'StaffNoteWhereUniqueInput',
    distinct: 'StaffNoteScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.staffNote.findFirst({
      ...args,
      ...select,
    })
  },
})

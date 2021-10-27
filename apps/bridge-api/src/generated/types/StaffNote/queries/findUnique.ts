import { queryField, nonNull } from 'nexus'

export const StaffNoteFindUniqueQuery = queryField('findUniqueStaffNote', {
  type: 'StaffNote',
  args: {
    where: nonNull('StaffNoteWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.staffNote.findUnique({
      where,
      ...select,
    })
  },
})

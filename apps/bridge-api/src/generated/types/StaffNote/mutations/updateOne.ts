import { mutationField, nonNull } from 'nexus'

export const StaffNoteUpdateOneMutation = mutationField('updateOneStaffNote', {
  type: nonNull('StaffNote'),
  args: {
    where: nonNull('StaffNoteWhereUniqueInput'),
    data: nonNull('StaffNoteUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.staffNote.update({
      where,
      data,
      ...select,
    })
  },
})

import { mutationField, nonNull } from 'nexus'

export const StaffNoteUpdateOneMutation = mutationField('updateOneStaffNote', {
  type: nonNull('StaffNote'),
  args: {
    data: nonNull('StaffNoteUpdateInput'),
    where: nonNull('StaffNoteWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.staffNote.update({
      where,
      data,
      ...select,
    })
  },
})

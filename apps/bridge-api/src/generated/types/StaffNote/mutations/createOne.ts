import { mutationField, nonNull } from 'nexus'

export const StaffNoteCreateOneMutation = mutationField('createOneStaffNote', {
  type: nonNull('StaffNote'),
  args: {
    data: nonNull('StaffNoteCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.staffNote.create({
      data,
      ...select,
    })
  },
})

import { mutationField, nonNull } from 'nexus'

export const StaffNoteDeleteOneMutation = mutationField('deleteOneStaffNote', {
  type: 'StaffNote',
  args: {
    where: nonNull('StaffNoteWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.staffNote.delete({
      where,
      ...select,
    })
  },
})

import { mutationField, nonNull } from 'nexus'

export const StaffNoteUpsertOneMutation = mutationField('upsertOneStaffNote', {
  type: nonNull('StaffNote'),
  args: {
    where: nonNull('StaffNoteWhereUniqueInput'),
    create: nonNull('StaffNoteCreateInput'),
    update: nonNull('StaffNoteUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.staffNote.upsert({
      ...args,
      ...select,
    })
  },
})

import { mutationField, nonNull } from 'nexus'

export const StaffNoteUpdateManyMutation = mutationField(
  'updateManyStaffNote',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('StaffNoteUpdateManyMutationInput'),
      where: 'StaffNoteWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.staffNote.updateMany(args as any)
    },
  },
)

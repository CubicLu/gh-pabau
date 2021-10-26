import { mutationField, nonNull } from 'nexus'

export const StaffNoteUpdateManyMutation = mutationField(
  'updateManyStaffNote',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'StaffNoteWhereInput',
      data: nonNull('StaffNoteUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.staffNote.updateMany(args as any)
    },
  },
)

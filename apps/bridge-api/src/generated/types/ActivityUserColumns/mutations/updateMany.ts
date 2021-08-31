import { mutationField, nonNull } from 'nexus'

export const ActivityUserColumnsUpdateManyMutation = mutationField(
  'updateManyActivityUserColumns',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ActivityUserColumnsWhereInput',
      data: nonNull('ActivityUserColumnsUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.activityUserColumns.updateMany(args as any)
    },
  },
)

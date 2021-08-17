import { mutationField, nonNull } from 'nexus'

export const BugLogUpdateManyMutation = mutationField('updateManyBugLog', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'BugLogWhereInput',
    data: nonNull('BugLogUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.bugLog.updateMany(args as any)
  },
})

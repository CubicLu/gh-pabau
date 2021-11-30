import { mutationField, nonNull } from 'nexus'

export const BugLogUpdateManyMutation = mutationField('updateManyBugLog', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('BugLogUpdateManyMutationInput'),
    where: 'BugLogWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.bugLog.updateMany(args as any)
  },
})

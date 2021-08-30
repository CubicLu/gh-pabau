import { mutationField, nonNull } from 'nexus'

export const BugLogUpsertOneMutation = mutationField('upsertOneBugLog', {
  type: nonNull('BugLog'),
  args: {
    where: nonNull('BugLogWhereUniqueInput'),
    create: nonNull('BugLogCreateInput'),
    update: nonNull('BugLogUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.bugLog.upsert({
      ...args,
      ...select,
    })
  },
})

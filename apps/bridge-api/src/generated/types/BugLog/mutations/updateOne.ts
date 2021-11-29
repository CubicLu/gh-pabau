import { mutationField, nonNull } from 'nexus'

export const BugLogUpdateOneMutation = mutationField('updateOneBugLog', {
  type: nonNull('BugLog'),
  args: {
    data: nonNull('BugLogUpdateInput'),
    where: nonNull('BugLogWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.bugLog.update({
      where,
      data,
      ...select,
    })
  },
})

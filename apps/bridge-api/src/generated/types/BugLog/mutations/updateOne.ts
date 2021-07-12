import { mutationField, nonNull } from 'nexus'

export const BugLogUpdateOneMutation = mutationField('updateOneBugLog', {
  type: nonNull('BugLog'),
  args: {
    where: nonNull('BugLogWhereUniqueInput'),
    data: nonNull('BugLogUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.bugLog.update({
      where,
      data,
      ...select,
    })
  },
})

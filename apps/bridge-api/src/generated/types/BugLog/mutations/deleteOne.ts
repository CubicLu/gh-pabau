import { mutationField, nonNull } from 'nexus'

export const BugLogDeleteOneMutation = mutationField('deleteOneBugLog', {
  type: 'BugLog',
  args: {
    where: nonNull('BugLogWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.bugLog.delete({
      where,
      ...select,
    })
  },
})

import { mutationField, nonNull } from 'nexus'

export const BugLogCreateOneMutation = mutationField('createOneBugLog', {
  type: nonNull('BugLog'),
  args: {
    data: nonNull('BugLogCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.bugLog.create({
      data,
      ...select,
    })
  },
})

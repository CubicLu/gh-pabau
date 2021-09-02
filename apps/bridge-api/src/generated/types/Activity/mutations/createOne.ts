import { mutationField, nonNull } from 'nexus'

export const ActivityCreateOneMutation = mutationField('createOneActivity', {
  type: nonNull('Activity'),
  args: {
    data: nonNull('ActivityCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.activity.create({
      data,
      ...select,
    })
  },
})

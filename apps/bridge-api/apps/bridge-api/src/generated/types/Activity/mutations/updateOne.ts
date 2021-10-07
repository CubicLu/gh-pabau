import { mutationField, nonNull } from 'nexus'

export const ActivityUpdateOneMutation = mutationField('updateOneActivity', {
  type: nonNull('Activity'),
  args: {
    where: nonNull('ActivityWhereUniqueInput'),
    data: nonNull('ActivityUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.activity.update({
      where,
      data,
      ...select,
    })
  },
})

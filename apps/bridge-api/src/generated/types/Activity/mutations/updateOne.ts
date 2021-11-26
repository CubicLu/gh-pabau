import { mutationField, nonNull } from 'nexus'

export const ActivityUpdateOneMutation = mutationField('updateOneActivity', {
  type: nonNull('Activity'),
  args: {
    data: nonNull('ActivityUpdateInput'),
    where: nonNull('ActivityWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.activity.update({
      where,
      data,
      ...select,
    })
  },
})

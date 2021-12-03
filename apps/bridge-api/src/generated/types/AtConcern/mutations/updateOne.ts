import { mutationField, nonNull } from 'nexus'

export const AtConcernUpdateOneMutation = mutationField('updateOneAtConcern', {
  type: nonNull('AtConcern'),
  args: {
    data: nonNull('AtConcernUpdateInput'),
    where: nonNull('AtConcernWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.atConcern.update({
      where,
      data,
      ...select,
    })
  },
})

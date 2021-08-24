import { mutationField, nonNull } from 'nexus'

export const AtConcernUpdateOneMutation = mutationField('updateOneAtConcern', {
  type: nonNull('AtConcern'),
  args: {
    where: nonNull('AtConcernWhereUniqueInput'),
    data: nonNull('AtConcernUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.atConcern.update({
      where,
      data,
      ...select,
    })
  },
})

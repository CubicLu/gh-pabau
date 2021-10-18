import { mutationField, nonNull } from 'nexus'

export const PathwaysUpdateOneMutation = mutationField('updateOnePathways', {
  type: nonNull('Pathways'),
  args: {
    where: nonNull('PathwaysWhereUniqueInput'),
    data: nonNull('PathwaysUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.pathways.update({
      where,
      data,
      ...select,
    })
  },
})

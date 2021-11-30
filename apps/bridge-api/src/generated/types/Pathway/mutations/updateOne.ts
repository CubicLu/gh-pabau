import { mutationField, nonNull } from 'nexus'

export const PathwayUpdateOneMutation = mutationField('updateOnePathway', {
  type: nonNull('Pathway'),
  args: {
    data: nonNull('PathwayUpdateInput'),
    where: nonNull('PathwayWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.pathway.update({
      where,
      data,
      ...select,
    })
  },
})

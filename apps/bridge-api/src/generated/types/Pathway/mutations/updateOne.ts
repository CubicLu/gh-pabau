import { mutationField, nonNull } from 'nexus'

export const PathwayUpdateOneMutation = mutationField('updateOnePathway', {
  type: nonNull('Pathway'),
  args: {
    where: nonNull('PathwayWhereUniqueInput'),
    data: nonNull('PathwayUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.pathway.update({
      where,
      data,
      ...select,
    })
  },
})

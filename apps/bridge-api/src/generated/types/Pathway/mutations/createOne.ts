import { mutationField, nonNull } from 'nexus'

export const PathwayCreateOneMutation = mutationField('createOnePathway', {
  type: nonNull('Pathway'),
  args: {
    data: nonNull('PathwayCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.pathway.create({
      data,
      ...select,
    })
  },
})

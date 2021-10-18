import { mutationField, nonNull } from 'nexus'

export const PathwaysCreateOneMutation = mutationField('createOnePathways', {
  type: nonNull('Pathways'),
  args: {
    data: nonNull('PathwaysCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.pathways.create({
      data,
      ...select,
    })
  },
})

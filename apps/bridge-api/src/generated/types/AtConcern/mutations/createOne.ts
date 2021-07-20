import { mutationField, nonNull } from 'nexus'

export const AtConcernCreateOneMutation = mutationField('createOneAtConcern', {
  type: nonNull('AtConcern'),
  args: {
    data: nonNull('AtConcernCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.atConcern.create({
      data,
      ...select,
    })
  },
})

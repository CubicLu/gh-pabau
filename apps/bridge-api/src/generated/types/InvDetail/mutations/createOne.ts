import { mutationField, nonNull } from 'nexus'

export const InvDetailCreateOneMutation = mutationField('createOneInvDetail', {
  type: nonNull('InvDetail'),
  args: {
    data: nonNull('InvDetailCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.invDetail.create({
      data,
      ...select,
    })
  },
})

import { mutationField, nonNull } from 'nexus'

export const InvBillerCreateOneMutation = mutationField('createOneInvBiller', {
  type: nonNull('InvBiller'),
  args: {
    data: nonNull('InvBillerCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.invBiller.create({
      data,
      ...select,
    })
  },
})

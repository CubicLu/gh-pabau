import { mutationField, nonNull } from 'nexus'

export const InvBillerUpdateOneMutation = mutationField('updateOneInvBiller', {
  type: nonNull('InvBiller'),
  args: {
    data: nonNull('InvBillerUpdateInput'),
    where: nonNull('InvBillerWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.invBiller.update({
      where,
      data,
      ...select,
    })
  },
})

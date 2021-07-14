import { mutationField, nonNull } from 'nexus'

export const InvBillerUpdateOneMutation = mutationField('updateOneInvBiller', {
  type: nonNull('InvBiller'),
  args: {
    where: nonNull('InvBillerWhereUniqueInput'),
    data: nonNull('InvBillerUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.invBiller.update({
      where,
      data,
      ...select,
    })
  },
})

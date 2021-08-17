import { mutationField, nonNull } from 'nexus'

export const InvBillerUpsertOneMutation = mutationField('upsertOneInvBiller', {
  type: nonNull('InvBiller'),
  args: {
    where: nonNull('InvBillerWhereUniqueInput'),
    create: nonNull('InvBillerCreateInput'),
    update: nonNull('InvBillerUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invBiller.upsert({
      ...args,
      ...select,
    })
  },
})

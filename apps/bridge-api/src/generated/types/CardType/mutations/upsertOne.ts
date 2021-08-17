import { mutationField, nonNull } from 'nexus'

export const CardTypeUpsertOneMutation = mutationField('upsertOneCardType', {
  type: nonNull('CardType'),
  args: {
    where: nonNull('CardTypeWhereUniqueInput'),
    create: nonNull('CardTypeCreateInput'),
    update: nonNull('CardTypeUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cardType.upsert({
      ...args,
      ...select,
    })
  },
})

import { mutationField, nonNull } from 'nexus'

export const CardTypeCreateOneMutation = mutationField('createOneCardType', {
  type: nonNull('CardType'),
  args: {
    data: nonNull('CardTypeCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.cardType.create({
      data,
      ...select,
    })
  },
})

import { mutationField, nonNull } from 'nexus'

export const BatchItemUpsertOneMutation = mutationField('upsertOneBatchItem', {
  type: nonNull('BatchItem'),
  args: {
    where: nonNull('BatchItemWhereUniqueInput'),
    create: nonNull('BatchItemCreateInput'),
    update: nonNull('BatchItemUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.batchItem.upsert({
      ...args,
      ...select,
    })
  },
})

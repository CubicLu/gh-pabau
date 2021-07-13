import { mutationField, nonNull } from 'nexus'

export const BatchUpsertOneMutation = mutationField('upsertOneBatch', {
  type: nonNull('Batch'),
  args: {
    where: nonNull('BatchWhereUniqueInput'),
    create: nonNull('BatchCreateInput'),
    update: nonNull('BatchUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.batch.upsert({
      ...args,
      ...select,
    })
  },
})

import { mutationField, nonNull } from 'nexus'

export const PathwaysUpsertOneMutation = mutationField('upsertOnePathways', {
  type: nonNull('Pathways'),
  args: {
    where: nonNull('PathwaysWhereUniqueInput'),
    create: nonNull('PathwaysCreateInput'),
    update: nonNull('PathwaysUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pathways.upsert({
      ...args,
      ...select,
    })
  },
})

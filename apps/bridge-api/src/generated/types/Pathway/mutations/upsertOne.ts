import { mutationField, nonNull } from 'nexus'

export const PathwayUpsertOneMutation = mutationField('upsertOnePathway', {
  type: nonNull('Pathway'),
  args: {
    where: nonNull('PathwayWhereUniqueInput'),
    create: nonNull('PathwayCreateInput'),
    update: nonNull('PathwayUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pathway.upsert({
      ...args,
      ...select,
    })
  },
})

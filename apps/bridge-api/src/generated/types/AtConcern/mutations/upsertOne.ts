import { mutationField, nonNull } from 'nexus'

export const AtConcernUpsertOneMutation = mutationField('upsertOneAtConcern', {
  type: nonNull('AtConcern'),
  args: {
    where: nonNull('AtConcernWhereUniqueInput'),
    create: nonNull('AtConcernCreateInput'),
    update: nonNull('AtConcernUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atConcern.upsert({
      ...args,
      ...select,
    })
  },
})

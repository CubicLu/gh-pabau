import { mutationField, nonNull } from 'nexus'

export const ActivityUpsertOneMutation = mutationField('upsertOneActivity', {
  type: nonNull('Activity'),
  args: {
    where: nonNull('ActivityWhereUniqueInput'),
    create: nonNull('ActivityCreateInput'),
    update: nonNull('ActivityUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.activity.upsert({
      ...args,
      ...select,
    })
  },
})

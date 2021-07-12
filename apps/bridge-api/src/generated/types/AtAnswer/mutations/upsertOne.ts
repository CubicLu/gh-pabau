import { mutationField, nonNull } from 'nexus'

export const AtAnswerUpsertOneMutation = mutationField('upsertOneAtAnswer', {
  type: nonNull('AtAnswer'),
  args: {
    where: nonNull('AtAnswerWhereUniqueInput'),
    create: nonNull('AtAnswerCreateInput'),
    update: nonNull('AtAnswerUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atAnswer.upsert({
      ...args,
      ...select,
    })
  },
})

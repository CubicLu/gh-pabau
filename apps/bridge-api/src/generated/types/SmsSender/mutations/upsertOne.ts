import { mutationField, nonNull } from 'nexus'

export const SmsSenderUpsertOneMutation = mutationField('upsertOneSmsSender', {
  type: nonNull('SmsSender'),
  args: {
    where: nonNull('SmsSenderWhereUniqueInput'),
    create: nonNull('SmsSenderCreateInput'),
    update: nonNull('SmsSenderUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.smsSender.upsert({
      ...args,
      ...select,
    })
  },
})

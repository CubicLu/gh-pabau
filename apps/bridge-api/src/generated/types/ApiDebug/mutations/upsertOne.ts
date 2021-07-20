import { mutationField, nonNull } from 'nexus'

export const ApiDebugUpsertOneMutation = mutationField('upsertOneApiDebug', {
  type: nonNull('ApiDebug'),
  args: {
    where: nonNull('ApiDebugWhereUniqueInput'),
    create: nonNull('ApiDebugCreateInput'),
    update: nonNull('ApiDebugUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.apiDebug.upsert({
      ...args,
      ...select,
    })
  },
})

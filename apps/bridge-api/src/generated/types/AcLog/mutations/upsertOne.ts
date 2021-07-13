import { mutationField, nonNull } from 'nexus'

export const AcLogUpsertOneMutation = mutationField('upsertOneAcLog', {
  type: nonNull('AcLog'),
  args: {
    where: nonNull('AcLogWhereUniqueInput'),
    create: nonNull('AcLogCreateInput'),
    update: nonNull('AcLogUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.acLog.upsert({
      ...args,
      ...select,
    })
  },
})

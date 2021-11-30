import { mutationField, nonNull } from 'nexus'

export const AcLogUpdateManyMutation = mutationField('updateManyAcLog', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('AcLogUpdateManyMutationInput'),
    where: 'AcLogWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.acLog.updateMany(args as any)
  },
})

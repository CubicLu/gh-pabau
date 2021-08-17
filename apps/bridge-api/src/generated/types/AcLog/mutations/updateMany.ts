import { mutationField, nonNull } from 'nexus'

export const AcLogUpdateManyMutation = mutationField('updateManyAcLog', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'AcLogWhereInput',
    data: nonNull('AcLogUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.acLog.updateMany(args as any)
  },
})

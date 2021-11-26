import { mutationField, nonNull } from 'nexus'

export const ApiDebugUpdateManyMutation = mutationField('updateManyApiDebug', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('ApiDebugUpdateManyMutationInput'),
    where: 'ApiDebugWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.apiDebug.updateMany(args as any)
  },
})

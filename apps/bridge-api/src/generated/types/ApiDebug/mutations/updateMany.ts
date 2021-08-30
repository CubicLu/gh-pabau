import { mutationField, nonNull } from 'nexus'

export const ApiDebugUpdateManyMutation = mutationField('updateManyApiDebug', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'ApiDebugWhereInput',
    data: nonNull('ApiDebugUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.apiDebug.updateMany(args as any)
  },
})

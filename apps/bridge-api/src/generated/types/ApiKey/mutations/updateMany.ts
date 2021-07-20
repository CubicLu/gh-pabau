import { mutationField, nonNull } from 'nexus'

export const ApiKeyUpdateManyMutation = mutationField('updateManyApiKey', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'ApiKeyWhereInput',
    data: nonNull('ApiKeyUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.apiKey.updateMany(args as any)
  },
})

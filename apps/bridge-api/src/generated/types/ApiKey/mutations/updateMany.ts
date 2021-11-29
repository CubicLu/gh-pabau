import { mutationField, nonNull } from 'nexus'

export const ApiKeyUpdateManyMutation = mutationField('updateManyApiKey', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('ApiKeyUpdateManyMutationInput'),
    where: 'ApiKeyWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.apiKey.updateMany(args as any)
  },
})

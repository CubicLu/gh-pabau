import { mutationField, nonNull } from 'nexus'

export const ApiKeyDeleteOneMutation = mutationField('deleteOneApiKey', {
  type: 'ApiKey',
  args: {
    where: nonNull('ApiKeyWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.apiKey.delete({
      where,
      ...select,
    })
  },
})

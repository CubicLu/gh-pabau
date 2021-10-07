import { queryField, nonNull } from 'nexus'

export const ApiKeyFindUniqueQuery = queryField('findUniqueApiKey', {
  type: 'ApiKey',
  args: {
    where: nonNull('ApiKeyWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.apiKey.findUnique({
      where,
      ...select,
    })
  },
})

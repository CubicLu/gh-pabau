import { queryField, list } from 'nexus'

export const ApiKeyFindFirstQuery = queryField('findFirstApiKey', {
  type: 'ApiKey',
  args: {
    where: 'ApiKeyWhereInput',
    orderBy: list('ApiKeyOrderByWithRelationInput'),
    cursor: 'ApiKeyWhereUniqueInput',
    distinct: 'ApiKeyScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.apiKey.findFirst({
      ...args,
      ...select,
    })
  },
})

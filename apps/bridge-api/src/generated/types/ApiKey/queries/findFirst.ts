import { queryField, list } from 'nexus'

export const ApiKeyFindFirstQuery = queryField('findFirstApiKey', {
  type: 'ApiKey',
  args: {
    where: 'ApiKeyWhereInput',
    orderBy: list('ApiKeyOrderByWithRelationInput'),
    cursor: 'ApiKeyWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('ApiKeyScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.apiKey.findFirst({
      ...args,
      ...select,
    })
  },
})

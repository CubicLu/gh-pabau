import { queryField, nonNull, list } from 'nexus'

export const ApiKeyFindCountQuery = queryField('findManyApiKeyCount', {
  type: nonNull('Int'),
  args: {
    where: 'ApiKeyWhereInput',
    orderBy: list('ApiKeyOrderByWithRelationInput'),
    cursor: 'ApiKeyWhereUniqueInput',
    distinct: 'ApiKeyScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.apiKey.count(args as any)
  },
})

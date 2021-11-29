import { queryField, nonNull, list } from 'nexus'

export const ApiKeyFindCountQuery = queryField('findManyApiKeyCount', {
  type: nonNull('Int'),
  args: {
    where: 'ApiKeyWhereInput',
    orderBy: list('ApiKeyOrderByWithRelationInput'),
    cursor: 'ApiKeyWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('ApiKeyScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.apiKey.count(args as any)
  },
})

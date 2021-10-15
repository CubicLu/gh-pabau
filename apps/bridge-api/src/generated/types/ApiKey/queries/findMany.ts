import { queryField, nonNull, list } from 'nexus'

export const ApiKeyFindManyQuery = queryField('findManyApiKey', {
  type: nonNull(list(nonNull('ApiKey'))),
  args: {
    where: 'ApiKeyWhereInput',
    orderBy: list('ApiKeyOrderByInput'),
    cursor: 'ApiKeyWhereUniqueInput',
    distinct: 'ApiKeyScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.apiKey.findMany({
      ...args,
      ...select,
    })
  },
})

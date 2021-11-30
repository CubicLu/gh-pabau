import { queryField, nonNull, list } from 'nexus'

export const ApiKeyFindManyQuery = queryField('findManyApiKey', {
  type: nonNull(list(nonNull('ApiKey'))),
  args: {
    where: 'ApiKeyWhereInput',
    orderBy: list('ApiKeyOrderByWithRelationInput'),
    cursor: 'ApiKeyWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('ApiKeyScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.apiKey.findMany({
      ...args,
      ...select,
    })
  },
})

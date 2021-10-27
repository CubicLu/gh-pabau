import { queryField, nonNull, list } from 'nexus'

export const CmContactJsonFindManyQuery = queryField('findManyCmContactJson', {
  type: nonNull(list(nonNull('CmContactJson'))),
  args: {
    where: 'CmContactJsonWhereInput',
    orderBy: list('CmContactJsonOrderByWithRelationInput'),
    cursor: 'CmContactJsonWhereUniqueInput',
    distinct: 'CmContactJsonScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmContactJson.findMany({
      ...args,
      ...select,
    })
  },
})

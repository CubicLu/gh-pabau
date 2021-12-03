import { queryField, nonNull, list } from 'nexus'

export const CmContactJsonFindManyQuery = queryField('findManyCmContactJson', {
  type: nonNull(list(nonNull('CmContactJson'))),
  args: {
    where: 'CmContactJsonWhereInput',
    orderBy: list('CmContactJsonOrderByWithRelationInput'),
    cursor: 'CmContactJsonWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmContactJsonScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmContactJson.findMany({
      ...args,
      ...select,
    })
  },
})

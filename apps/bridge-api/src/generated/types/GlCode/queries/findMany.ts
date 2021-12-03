import { queryField, nonNull, list } from 'nexus'

export const GlCodeFindManyQuery = queryField('findManyGlCode', {
  type: nonNull(list(nonNull('GlCode'))),
  args: {
    where: 'GlCodeWhereInput',
    orderBy: list('GlCodeOrderByWithRelationInput'),
    cursor: 'GlCodeWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('GlCodeScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.glCode.findMany({
      ...args,
      ...select,
    })
  },
})

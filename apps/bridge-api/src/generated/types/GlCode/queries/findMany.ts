import { queryField, nonNull, list } from 'nexus'

export const GlCodeFindManyQuery = queryField('findManyGlCode', {
  type: nonNull(list(nonNull('GlCode'))),
  args: {
    where: 'GlCodeWhereInput',
    orderBy: list('GlCodeOrderByInput'),
    cursor: 'GlCodeWhereUniqueInput',
    distinct: 'GlCodeScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.glCode.findMany({
      ...args,
      ...select,
    })
  },
})

import { queryField, list } from 'nexus'

export const GlCodeFindFirstQuery = queryField('findFirstGlCode', {
  type: 'GlCode',
  args: {
    where: 'GlCodeWhereInput',
    orderBy: list('GlCodeOrderByWithRelationInput'),
    cursor: 'GlCodeWhereUniqueInput',
    distinct: 'GlCodeScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.glCode.findFirst({
      ...args,
      ...select,
    })
  },
})

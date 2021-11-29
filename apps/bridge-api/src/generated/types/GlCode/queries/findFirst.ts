import { queryField, list } from 'nexus'

export const GlCodeFindFirstQuery = queryField('findFirstGlCode', {
  type: 'GlCode',
  args: {
    where: 'GlCodeWhereInput',
    orderBy: list('GlCodeOrderByWithRelationInput'),
    cursor: 'GlCodeWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('GlCodeScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.glCode.findFirst({
      ...args,
      ...select,
    })
  },
})

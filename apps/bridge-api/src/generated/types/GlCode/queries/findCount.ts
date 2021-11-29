import { queryField, nonNull, list } from 'nexus'

export const GlCodeFindCountQuery = queryField('findManyGlCodeCount', {
  type: nonNull('Int'),
  args: {
    where: 'GlCodeWhereInput',
    orderBy: list('GlCodeOrderByWithRelationInput'),
    cursor: 'GlCodeWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('GlCodeScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.glCode.count(args as any)
  },
})

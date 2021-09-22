import { queryField, nonNull, list } from 'nexus'

export const GlCodeFindCountQuery = queryField('findManyGlCodeCount', {
  type: nonNull('Int'),
  args: {
    where: 'GlCodeWhereInput',
    orderBy: list('GlCodeOrderByWithRelationInput'),
    cursor: 'GlCodeWhereUniqueInput',
    distinct: 'GlCodeScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.glCode.count(args as any)
  },
})

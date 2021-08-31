import { queryField, nonNull, list } from 'nexus'

export const CmLabelFindCountQuery = queryField('findManyCmLabelCount', {
  type: nonNull('Int'),
  args: {
    where: 'CmLabelWhereInput',
    orderBy: list('CmLabelOrderByWithRelationInput'),
    cursor: 'CmLabelWhereUniqueInput',
    distinct: 'CmLabelScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cmLabel.count(args as any)
  },
})

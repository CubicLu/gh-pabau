import { queryField, nonNull, list } from 'nexus'

export const CmLabelFindCountQuery = queryField('findManyCmLabelCount', {
  type: nonNull('Int'),
  args: {
    where: 'CmLabelWhereInput',
    orderBy: list('CmLabelOrderByWithRelationInput'),
    cursor: 'CmLabelWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmLabelScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cmLabel.count(args as any)
  },
})

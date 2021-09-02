import { queryField, nonNull, list } from 'nexus'

export const CmLeadFindCountQuery = queryField('findManyCmLeadCount', {
  type: nonNull('Int'),
  args: {
    where: 'CmLeadWhereInput',
    orderBy: list('CmLeadOrderByWithRelationInput'),
    cursor: 'CmLeadWhereUniqueInput',
    distinct: 'CmLeadScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cmLead.count(args as any)
  },
})

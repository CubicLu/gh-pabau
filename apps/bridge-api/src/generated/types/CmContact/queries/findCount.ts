import { queryField, nonNull, list } from 'nexus'

export const CmContactFindCountQuery = queryField('findManyCmContactCount', {
  type: nonNull('Int'),
  args: {
    where: 'CmContactWhereInput',
    orderBy: list('CmContactOrderByWithRelationInput'),
    cursor: 'CmContactWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmContactScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cmContact.count(args as any)
  },
})

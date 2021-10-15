import { queryField, nonNull, list } from 'nexus'

export const CmContactFindCountQuery = queryField('findManyCmContactCount', {
  type: nonNull('Int'),
  args: {
    where: 'CmContactWhereInput',
    orderBy: list('CmContactOrderByInput'),
    cursor: 'CmContactWhereUniqueInput',
    distinct: 'CmContactScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cmContact.count(args as any)
  },
})

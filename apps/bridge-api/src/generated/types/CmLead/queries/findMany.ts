import { queryField, nonNull, list } from 'nexus'

export const CmLeadFindManyQuery = queryField('findManyCmLead', {
  type: nonNull(list(nonNull('CmLead'))),
  args: {
    where: 'CmLeadWhereInput',
    orderBy: list('CmLeadOrderByInput'),
    cursor: 'CmLeadWhereUniqueInput',
    distinct: 'CmLeadScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmLead.findMany({
      ...args,
      ...select,
    })
  },
})

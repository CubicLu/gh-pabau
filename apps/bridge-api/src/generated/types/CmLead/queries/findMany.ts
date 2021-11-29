import { queryField, nonNull, list } from 'nexus'

export const CmLeadFindManyQuery = queryField('findManyCmLead', {
  type: nonNull(list(nonNull('CmLead'))),
  args: {
    where: 'CmLeadWhereInput',
    orderBy: list('CmLeadOrderByWithRelationInput'),
    cursor: 'CmLeadWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmLeadScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmLead.findMany({
      ...args,
      ...select,
    })
  },
})

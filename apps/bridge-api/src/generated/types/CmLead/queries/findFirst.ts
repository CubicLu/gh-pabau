import { queryField, list } from 'nexus'

export const CmLeadFindFirstQuery = queryField('findFirstCmLead', {
  type: 'CmLead',
  args: {
    where: 'CmLeadWhereInput',
    orderBy: list('CmLeadOrderByWithRelationInput'),
    cursor: 'CmLeadWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmLeadScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmLead.findFirst({
      ...args,
      ...select,
    })
  },
})

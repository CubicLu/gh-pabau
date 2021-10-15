import { queryField, list } from 'nexus'

export const CmLeadFindFirstQuery = queryField('findFirstCmLead', {
  type: 'CmLead',
  args: {
    where: 'CmLeadWhereInput',
    orderBy: list('CmLeadOrderByInput'),
    cursor: 'CmLeadWhereUniqueInput',
    distinct: 'CmLeadScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmLead.findFirst({
      ...args,
      ...select,
    })
  },
})

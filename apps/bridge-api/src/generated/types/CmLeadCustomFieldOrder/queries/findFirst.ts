import { queryField, list } from 'nexus'

export const CmLeadCustomFieldOrderFindFirstQuery = queryField(
  'findFirstCmLeadCustomFieldOrder',
  {
    type: 'CmLeadCustomFieldOrder',
    args: {
      where: 'CmLeadCustomFieldOrderWhereInput',
      orderBy: list('CmLeadCustomFieldOrderOrderByWithRelationInput'),
      cursor: 'CmLeadCustomFieldOrderWhereUniqueInput',
      distinct: 'CmLeadCustomFieldOrderScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmLeadCustomFieldOrder.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

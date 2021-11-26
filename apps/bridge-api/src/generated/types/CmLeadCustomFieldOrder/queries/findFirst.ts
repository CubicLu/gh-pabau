import { queryField, list } from 'nexus'

export const CmLeadCustomFieldOrderFindFirstQuery = queryField(
  'findFirstCmLeadCustomFieldOrder',
  {
    type: 'CmLeadCustomFieldOrder',
    args: {
      where: 'CmLeadCustomFieldOrderWhereInput',
      orderBy: list('CmLeadCustomFieldOrderOrderByWithRelationInput'),
      cursor: 'CmLeadCustomFieldOrderWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmLeadCustomFieldOrderScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmLeadCustomFieldOrder.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

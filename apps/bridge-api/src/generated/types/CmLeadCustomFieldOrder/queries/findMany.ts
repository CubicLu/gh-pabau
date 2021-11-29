import { queryField, nonNull, list } from 'nexus'

export const CmLeadCustomFieldOrderFindManyQuery = queryField(
  'findManyCmLeadCustomFieldOrder',
  {
    type: nonNull(list(nonNull('CmLeadCustomFieldOrder'))),
    args: {
      where: 'CmLeadCustomFieldOrderWhereInput',
      orderBy: list('CmLeadCustomFieldOrderOrderByWithRelationInput'),
      cursor: 'CmLeadCustomFieldOrderWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmLeadCustomFieldOrderScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmLeadCustomFieldOrder.findMany({
        ...args,
        ...select,
      })
    },
  },
)

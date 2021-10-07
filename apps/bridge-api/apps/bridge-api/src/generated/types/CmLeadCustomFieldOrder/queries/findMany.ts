import { queryField, nonNull, list } from 'nexus'

export const CmLeadCustomFieldOrderFindManyQuery = queryField(
  'findManyCmLeadCustomFieldOrder',
  {
    type: nonNull(list(nonNull('CmLeadCustomFieldOrder'))),
    args: {
      where: 'CmLeadCustomFieldOrderWhereInput',
      orderBy: list('CmLeadCustomFieldOrderOrderByWithRelationInput'),
      cursor: 'CmLeadCustomFieldOrderWhereUniqueInput',
      distinct: 'CmLeadCustomFieldOrderScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmLeadCustomFieldOrder.findMany({
        ...args,
        ...select,
      })
    },
  },
)

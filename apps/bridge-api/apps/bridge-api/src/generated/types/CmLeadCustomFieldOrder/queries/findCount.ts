import { queryField, nonNull, list } from 'nexus'

export const CmLeadCustomFieldOrderFindCountQuery = queryField(
  'findManyCmLeadCustomFieldOrderCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmLeadCustomFieldOrderWhereInput',
      orderBy: list('CmLeadCustomFieldOrderOrderByWithRelationInput'),
      cursor: 'CmLeadCustomFieldOrderWhereUniqueInput',
      distinct: 'CmLeadCustomFieldOrderScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmLeadCustomFieldOrder.count(args as any)
    },
  },
)

import { queryField, nonNull, list } from 'nexus'

export const CmLeadCustomFieldFindCountQuery = queryField(
  'findManyCmLeadCustomFieldCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmLeadCustomFieldWhereInput',
      orderBy: list('CmLeadCustomFieldOrderByWithRelationInput'),
      cursor: 'CmLeadCustomFieldWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmLeadCustomFieldScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmLeadCustomField.count(args as any)
    },
  },
)

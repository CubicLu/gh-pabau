import { queryField, nonNull, list } from 'nexus'

export const CmProductCustomFieldFindCountQuery = queryField(
  'findManyCmProductCustomFieldCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmProductCustomFieldWhereInput',
      orderBy: list('CmProductCustomFieldOrderByWithRelationInput'),
      cursor: 'CmProductCustomFieldWhereUniqueInput',
      distinct: 'CmProductCustomFieldScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmProductCustomField.count(args as any)
    },
  },
)

import { queryField, nonNull, list } from 'nexus'

export const CustomFieldDisplayFindCountQuery = queryField(
  'findManyCustomFieldDisplayCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CustomFieldDisplayWhereInput',
      orderBy: list('CustomFieldDisplayOrderByWithRelationInput'),
      cursor: 'CustomFieldDisplayWhereUniqueInput',
      distinct: 'CustomFieldDisplayScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.customFieldDisplay.count(args as any)
    },
  },
)

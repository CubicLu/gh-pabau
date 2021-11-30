import { queryField, nonNull, list } from 'nexus'

export const ManageCustomFieldItemFindCountQuery = queryField(
  'findManyManageCustomFieldItemCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ManageCustomFieldItemWhereInput',
      orderBy: list('ManageCustomFieldItemOrderByWithRelationInput'),
      cursor: 'ManageCustomFieldItemWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ManageCustomFieldItemScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.manageCustomFieldItem.count(args as any)
    },
  },
)

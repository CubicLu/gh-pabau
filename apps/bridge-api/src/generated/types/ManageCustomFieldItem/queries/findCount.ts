import { queryField, nonNull, list } from 'nexus'

export const ManageCustomFieldItemFindCountQuery = queryField(
  'findManyManageCustomFieldItemCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ManageCustomFieldItemWhereInput',
      orderBy: list('ManageCustomFieldItemOrderByInput'),
      cursor: 'ManageCustomFieldItemWhereUniqueInput',
      distinct: 'ManageCustomFieldItemScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.manageCustomFieldItem.count(args as any)
    },
  },
)

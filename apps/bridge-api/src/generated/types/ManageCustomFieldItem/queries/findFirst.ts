import { queryField, list } from 'nexus'

export const ManageCustomFieldItemFindFirstQuery = queryField(
  'findFirstManageCustomFieldItem',
  {
    type: 'ManageCustomFieldItem',
    args: {
      where: 'ManageCustomFieldItemWhereInput',
      orderBy: list('ManageCustomFieldItemOrderByInput'),
      cursor: 'ManageCustomFieldItemWhereUniqueInput',
      distinct: 'ManageCustomFieldItemScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.manageCustomFieldItem.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

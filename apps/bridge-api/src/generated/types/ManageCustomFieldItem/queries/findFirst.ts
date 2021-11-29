import { queryField, list } from 'nexus'

export const ManageCustomFieldItemFindFirstQuery = queryField(
  'findFirstManageCustomFieldItem',
  {
    type: 'ManageCustomFieldItem',
    args: {
      where: 'ManageCustomFieldItemWhereInput',
      orderBy: list('ManageCustomFieldItemOrderByWithRelationInput'),
      cursor: 'ManageCustomFieldItemWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ManageCustomFieldItemScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.manageCustomFieldItem.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

import { queryField, nonNull, list } from 'nexus'

export const ManageCustomFieldItemFindManyQuery = queryField(
  'findManyManageCustomFieldItem',
  {
    type: nonNull(list(nonNull('ManageCustomFieldItem'))),
    args: {
      where: 'ManageCustomFieldItemWhereInput',
      orderBy: list('ManageCustomFieldItemOrderByInput'),
      cursor: 'ManageCustomFieldItemWhereUniqueInput',
      distinct: 'ManageCustomFieldItemScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.manageCustomFieldItem.findMany({
        ...args,
        ...select,
      })
    },
  },
)

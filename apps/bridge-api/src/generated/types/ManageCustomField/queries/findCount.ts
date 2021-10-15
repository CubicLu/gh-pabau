import { queryField, nonNull, list } from 'nexus'

export const ManageCustomFieldFindCountQuery = queryField(
  'findManyManageCustomFieldCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ManageCustomFieldWhereInput',
      orderBy: list('ManageCustomFieldOrderByInput'),
      cursor: 'ManageCustomFieldWhereUniqueInput',
      distinct: 'ManageCustomFieldScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.manageCustomField.count(args as any)
    },
  },
)

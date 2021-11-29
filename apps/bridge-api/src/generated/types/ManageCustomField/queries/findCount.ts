import { queryField, nonNull, list } from 'nexus'

export const ManageCustomFieldFindCountQuery = queryField(
  'findManyManageCustomFieldCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ManageCustomFieldWhereInput',
      orderBy: list('ManageCustomFieldOrderByWithRelationInput'),
      cursor: 'ManageCustomFieldWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ManageCustomFieldScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.manageCustomField.count(args as any)
    },
  },
)

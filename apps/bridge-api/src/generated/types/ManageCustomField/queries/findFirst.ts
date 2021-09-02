import { queryField, list } from 'nexus'

export const ManageCustomFieldFindFirstQuery = queryField(
  'findFirstManageCustomField',
  {
    type: 'ManageCustomField',
    args: {
      where: 'ManageCustomFieldWhereInput',
      orderBy: list('ManageCustomFieldOrderByWithRelationInput'),
      cursor: 'ManageCustomFieldWhereUniqueInput',
      distinct: 'ManageCustomFieldScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.manageCustomField.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

import { queryField, list } from 'nexus'

export const ManageCustomFieldFindFirstQuery = queryField(
  'findFirstManageCustomField',
  {
    type: 'ManageCustomField',
    args: {
      where: 'ManageCustomFieldWhereInput',
      orderBy: list('ManageCustomFieldOrderByWithRelationInput'),
      cursor: 'ManageCustomFieldWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ManageCustomFieldScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.manageCustomField.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

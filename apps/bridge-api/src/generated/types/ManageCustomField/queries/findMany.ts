import { queryField, nonNull, list } from 'nexus'

export const ManageCustomFieldFindManyQuery = queryField(
  'findManyManageCustomField',
  {
    type: nonNull(list(nonNull('ManageCustomField'))),
    args: {
      where: 'ManageCustomFieldWhereInput',
      orderBy: list('ManageCustomFieldOrderByWithRelationInput'),
      cursor: 'ManageCustomFieldWhereUniqueInput',
      distinct: 'ManageCustomFieldScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.manageCustomField.findMany({
        ...args,
        ...select,
      })
    },
  },
)

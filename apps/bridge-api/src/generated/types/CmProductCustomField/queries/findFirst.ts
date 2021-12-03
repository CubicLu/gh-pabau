import { queryField, list } from 'nexus'

export const CmProductCustomFieldFindFirstQuery = queryField(
  'findFirstCmProductCustomField',
  {
    type: 'CmProductCustomField',
    args: {
      where: 'CmProductCustomFieldWhereInput',
      orderBy: list('CmProductCustomFieldOrderByWithRelationInput'),
      cursor: 'CmProductCustomFieldWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmProductCustomFieldScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmProductCustomField.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

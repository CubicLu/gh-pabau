import { queryField, list } from 'nexus'

export const CmProductCustomFieldFindFirstQuery = queryField(
  'findFirstCmProductCustomField',
  {
    type: 'CmProductCustomField',
    args: {
      where: 'CmProductCustomFieldWhereInput',
      orderBy: list('CmProductCustomFieldOrderByInput'),
      cursor: 'CmProductCustomFieldWhereUniqueInput',
      distinct: 'CmProductCustomFieldScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmProductCustomField.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

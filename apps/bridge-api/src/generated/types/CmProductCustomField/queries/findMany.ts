import { queryField, nonNull, list } from 'nexus'

export const CmProductCustomFieldFindManyQuery = queryField(
  'findManyCmProductCustomField',
  {
    type: nonNull(list(nonNull('CmProductCustomField'))),
    args: {
      where: 'CmProductCustomFieldWhereInput',
      orderBy: list('CmProductCustomFieldOrderByWithRelationInput'),
      cursor: 'CmProductCustomFieldWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmProductCustomFieldScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmProductCustomField.findMany({
        ...args,
        ...select,
      })
    },
  },
)

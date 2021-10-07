import { queryField, nonNull, list } from 'nexus'

export const CmProductCustomFieldFindManyQuery = queryField(
  'findManyCmProductCustomField',
  {
    type: nonNull(list(nonNull('CmProductCustomField'))),
    args: {
      where: 'CmProductCustomFieldWhereInput',
      orderBy: list('CmProductCustomFieldOrderByWithRelationInput'),
      cursor: 'CmProductCustomFieldWhereUniqueInput',
      distinct: 'CmProductCustomFieldScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmProductCustomField.findMany({
        ...args,
        ...select,
      })
    },
  },
)

import { queryField, nonNull, list } from 'nexus'

export const CmLeadCustomFieldFindManyQuery = queryField(
  'findManyCmLeadCustomField',
  {
    type: nonNull(list(nonNull('CmLeadCustomField'))),
    args: {
      where: 'CmLeadCustomFieldWhereInput',
      orderBy: list('CmLeadCustomFieldOrderByWithRelationInput'),
      cursor: 'CmLeadCustomFieldWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmLeadCustomFieldScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmLeadCustomField.findMany({
        ...args,
        ...select,
      })
    },
  },
)

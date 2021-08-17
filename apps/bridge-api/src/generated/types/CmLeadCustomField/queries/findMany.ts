import { queryField, nonNull, list } from 'nexus'

export const CmLeadCustomFieldFindManyQuery = queryField(
  'findManyCmLeadCustomField',
  {
    type: nonNull(list(nonNull('CmLeadCustomField'))),
    args: {
      where: 'CmLeadCustomFieldWhereInput',
      orderBy: list('CmLeadCustomFieldOrderByInput'),
      cursor: 'CmLeadCustomFieldWhereUniqueInput',
      distinct: 'CmLeadCustomFieldScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmLeadCustomField.findMany({
        ...args,
        ...select,
      })
    },
  },
)

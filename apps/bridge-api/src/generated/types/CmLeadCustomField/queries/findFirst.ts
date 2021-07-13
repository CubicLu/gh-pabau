import { queryField, list } from 'nexus'

export const CmLeadCustomFieldFindFirstQuery = queryField(
  'findFirstCmLeadCustomField',
  {
    type: 'CmLeadCustomField',
    args: {
      where: 'CmLeadCustomFieldWhereInput',
      orderBy: list('CmLeadCustomFieldOrderByInput'),
      cursor: 'CmLeadCustomFieldWhereUniqueInput',
      distinct: 'CmLeadCustomFieldScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmLeadCustomField.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

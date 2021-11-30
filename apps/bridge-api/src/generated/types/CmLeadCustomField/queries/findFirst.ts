import { queryField, list } from 'nexus'

export const CmLeadCustomFieldFindFirstQuery = queryField(
  'findFirstCmLeadCustomField',
  {
    type: 'CmLeadCustomField',
    args: {
      where: 'CmLeadCustomFieldWhereInput',
      orderBy: list('CmLeadCustomFieldOrderByWithRelationInput'),
      cursor: 'CmLeadCustomFieldWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmLeadCustomFieldScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmLeadCustomField.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

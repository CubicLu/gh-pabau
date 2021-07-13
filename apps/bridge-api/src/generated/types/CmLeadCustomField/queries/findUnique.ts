import { queryField, nonNull } from 'nexus'

export const CmLeadCustomFieldFindUniqueQuery = queryField(
  'findUniqueCmLeadCustomField',
  {
    type: 'CmLeadCustomField',
    args: {
      where: nonNull('CmLeadCustomFieldWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.cmLeadCustomField.findUnique({
        where,
        ...select,
      })
    },
  },
)

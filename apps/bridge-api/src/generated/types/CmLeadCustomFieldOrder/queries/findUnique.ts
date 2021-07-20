import { queryField, nonNull } from 'nexus'

export const CmLeadCustomFieldOrderFindUniqueQuery = queryField(
  'findUniqueCmLeadCustomFieldOrder',
  {
    type: 'CmLeadCustomFieldOrder',
    args: {
      where: nonNull('CmLeadCustomFieldOrderWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.cmLeadCustomFieldOrder.findUnique({
        where,
        ...select,
      })
    },
  },
)

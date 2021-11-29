import { mutationField, nonNull } from 'nexus'

export const CmLeadCustomFieldOrderUpdateOneMutation = mutationField(
  'updateOneCmLeadCustomFieldOrder',
  {
    type: nonNull('CmLeadCustomFieldOrder'),
    args: {
      data: nonNull('CmLeadCustomFieldOrderUpdateInput'),
      where: nonNull('CmLeadCustomFieldOrderWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmLeadCustomFieldOrder.update({
        where,
        data,
        ...select,
      })
    },
  },
)

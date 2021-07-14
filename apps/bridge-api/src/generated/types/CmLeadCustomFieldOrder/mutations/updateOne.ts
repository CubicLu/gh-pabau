import { mutationField, nonNull } from 'nexus'

export const CmLeadCustomFieldOrderUpdateOneMutation = mutationField(
  'updateOneCmLeadCustomFieldOrder',
  {
    type: nonNull('CmLeadCustomFieldOrder'),
    args: {
      where: nonNull('CmLeadCustomFieldOrderWhereUniqueInput'),
      data: nonNull('CmLeadCustomFieldOrderUpdateInput'),
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

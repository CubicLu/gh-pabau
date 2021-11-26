import { mutationField, nonNull } from 'nexus'

export const CmLeadCustomFieldUpdateOneMutation = mutationField(
  'updateOneCmLeadCustomField',
  {
    type: nonNull('CmLeadCustomField'),
    args: {
      data: nonNull('CmLeadCustomFieldUpdateInput'),
      where: nonNull('CmLeadCustomFieldWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmLeadCustomField.update({
        where,
        data,
        ...select,
      })
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const CmLeadCustomFieldUpdateOneMutation = mutationField(
  'updateOneCmLeadCustomField',
  {
    type: nonNull('CmLeadCustomField'),
    args: {
      where: nonNull('CmLeadCustomFieldWhereUniqueInput'),
      data: nonNull('CmLeadCustomFieldUpdateInput'),
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

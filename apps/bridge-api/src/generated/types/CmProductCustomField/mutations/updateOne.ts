import { mutationField, nonNull } from 'nexus'

export const CmProductCustomFieldUpdateOneMutation = mutationField(
  'updateOneCmProductCustomField',
  {
    type: nonNull('CmProductCustomField'),
    args: {
      data: nonNull('CmProductCustomFieldUpdateInput'),
      where: nonNull('CmProductCustomFieldWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmProductCustomField.update({
        where,
        data,
        ...select,
      })
    },
  },
)

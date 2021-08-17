import { mutationField, nonNull } from 'nexus'

export const CmProductCustomFieldUpdateOneMutation = mutationField(
  'updateOneCmProductCustomField',
  {
    type: nonNull('CmProductCustomField'),
    args: {
      where: nonNull('CmProductCustomFieldWhereUniqueInput'),
      data: nonNull('CmProductCustomFieldUpdateInput'),
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

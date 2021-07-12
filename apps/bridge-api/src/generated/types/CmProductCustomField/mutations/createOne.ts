import { mutationField, nonNull } from 'nexus'

export const CmProductCustomFieldCreateOneMutation = mutationField(
  'createOneCmProductCustomField',
  {
    type: nonNull('CmProductCustomField'),
    args: {
      data: nonNull('CmProductCustomFieldCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cmProductCustomField.create({
        data,
        ...select,
      })
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const CustomFieldDisplayCreateOneMutation = mutationField(
  'createOneCustomFieldDisplay',
  {
    type: nonNull('CustomFieldDisplay'),
    args: {
      data: nonNull('CustomFieldDisplayCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.customFieldDisplay.create({
        data,
        ...select,
      })
    },
  },
)

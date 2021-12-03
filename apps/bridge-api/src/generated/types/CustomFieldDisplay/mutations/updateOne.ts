import { mutationField, nonNull } from 'nexus'

export const CustomFieldDisplayUpdateOneMutation = mutationField(
  'updateOneCustomFieldDisplay',
  {
    type: nonNull('CustomFieldDisplay'),
    args: {
      data: nonNull('CustomFieldDisplayUpdateInput'),
      where: nonNull('CustomFieldDisplayWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.customFieldDisplay.update({
        where,
        data,
        ...select,
      })
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const CustomFieldDisplayUpdateOneMutation = mutationField(
  'updateOneCustomFieldDisplay',
  {
    type: nonNull('CustomFieldDisplay'),
    args: {
      where: nonNull('CustomFieldDisplayWhereUniqueInput'),
      data: nonNull('CustomFieldDisplayUpdateInput'),
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

import { mutationField, nonNull } from 'nexus'

export const CustomFieldDisplayUpsertOneMutation = mutationField(
  'upsertOneCustomFieldDisplay',
  {
    type: nonNull('CustomFieldDisplay'),
    args: {
      where: nonNull('CustomFieldDisplayWhereUniqueInput'),
      create: nonNull('CustomFieldDisplayCreateInput'),
      update: nonNull('CustomFieldDisplayUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.customFieldDisplay.upsert({
        ...args,
        ...select,
      })
    },
  },
)

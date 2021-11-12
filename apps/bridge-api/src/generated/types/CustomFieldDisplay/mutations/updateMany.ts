import { mutationField, nonNull } from 'nexus'

export const CustomFieldDisplayUpdateManyMutation = mutationField(
  'updateManyCustomFieldDisplay',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CustomFieldDisplayWhereInput',
      data: nonNull('CustomFieldDisplayUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.customFieldDisplay.updateMany(args as any)
    },
  },
)

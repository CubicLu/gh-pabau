import { mutationField, nonNull } from 'nexus'

export const CustomFieldDisplayUpdateManyMutation = mutationField(
  'updateManyCustomFieldDisplay',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CustomFieldDisplayUpdateManyMutationInput'),
      where: 'CustomFieldDisplayWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.customFieldDisplay.updateMany(args as any)
    },
  },
)

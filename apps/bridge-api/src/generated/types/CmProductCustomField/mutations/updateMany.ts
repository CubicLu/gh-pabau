import { mutationField, nonNull } from 'nexus'

export const CmProductCustomFieldUpdateManyMutation = mutationField(
  'updateManyCmProductCustomField',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CmProductCustomFieldUpdateManyMutationInput'),
      where: 'CmProductCustomFieldWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmProductCustomField.updateMany(args as any)
    },
  },
)

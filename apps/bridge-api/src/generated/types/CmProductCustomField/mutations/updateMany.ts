import { mutationField, nonNull } from 'nexus'

export const CmProductCustomFieldUpdateManyMutation = mutationField(
  'updateManyCmProductCustomField',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CmProductCustomFieldWhereInput',
      data: nonNull('CmProductCustomFieldUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmProductCustomField.updateMany(args as any)
    },
  },
)

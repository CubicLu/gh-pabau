import { mutationField, nonNull } from 'nexus'

export const CmLeadCustomFieldUpdateManyMutation = mutationField(
  'updateManyCmLeadCustomField',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CmLeadCustomFieldUpdateManyMutationInput'),
      where: 'CmLeadCustomFieldWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmLeadCustomField.updateMany(args as any)
    },
  },
)

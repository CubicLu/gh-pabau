import { mutationField, nonNull } from 'nexus'

export const CmLeadCustomFieldUpdateManyMutation = mutationField(
  'updateManyCmLeadCustomField',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CmLeadCustomFieldWhereInput',
      data: nonNull('CmLeadCustomFieldUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmLeadCustomField.updateMany(args as any)
    },
  },
)

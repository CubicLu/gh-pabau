import { mutationField, nonNull } from 'nexus'

export const CmLeadCustomFieldOrderUpdateManyMutation = mutationField(
  'updateManyCmLeadCustomFieldOrder',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CmLeadCustomFieldOrderUpdateManyMutationInput'),
      where: 'CmLeadCustomFieldOrderWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmLeadCustomFieldOrder.updateMany(args as any)
    },
  },
)

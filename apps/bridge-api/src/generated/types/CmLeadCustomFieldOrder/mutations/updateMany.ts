import { mutationField, nonNull } from 'nexus'

export const CmLeadCustomFieldOrderUpdateManyMutation = mutationField(
  'updateManyCmLeadCustomFieldOrder',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CmLeadCustomFieldOrderWhereInput',
      data: nonNull('CmLeadCustomFieldOrderUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmLeadCustomFieldOrder.updateMany(args as any)
    },
  },
)

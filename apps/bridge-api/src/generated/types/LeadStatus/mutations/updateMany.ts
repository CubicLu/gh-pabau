import { mutationField, nonNull } from 'nexus'

export const LeadStatusUpdateManyMutation = mutationField(
  'updateManyLeadStatus',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('LeadStatusUpdateManyMutationInput'),
      where: 'LeadStatusWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.leadStatus.updateMany(args as any)
    },
  },
)

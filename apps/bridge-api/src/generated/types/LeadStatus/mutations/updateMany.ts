import { mutationField, nonNull } from 'nexus'

export const LeadStatusUpdateManyMutation = mutationField(
  'updateManyLeadStatus',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'LeadStatusWhereInput',
      data: nonNull('LeadStatusUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.leadStatus.updateMany(args as any)
    },
  },
)

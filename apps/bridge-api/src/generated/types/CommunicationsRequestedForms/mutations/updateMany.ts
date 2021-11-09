import { mutationField, nonNull } from 'nexus'

export const CommunicationsRequestedFormsUpdateManyMutation = mutationField(
  'updateManyCommunicationsRequestedForms',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CommunicationsRequestedFormsWhereInput',
      data: nonNull('CommunicationsRequestedFormsUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.communicationsRequestedForms.updateMany(args as any)
    },
  },
)

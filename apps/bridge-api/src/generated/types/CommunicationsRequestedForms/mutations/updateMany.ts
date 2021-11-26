import { mutationField, nonNull } from 'nexus'

export const CommunicationsRequestedFormsUpdateManyMutation = mutationField(
  'updateManyCommunicationsRequestedForms',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CommunicationsRequestedFormsUpdateManyMutationInput'),
      where: 'CommunicationsRequestedFormsWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.communicationsRequestedForms.updateMany(args as any)
    },
  },
)

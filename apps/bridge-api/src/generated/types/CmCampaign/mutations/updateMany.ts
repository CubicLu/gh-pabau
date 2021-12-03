import { mutationField, nonNull } from 'nexus'

export const CmCampaignUpdateManyMutation = mutationField(
  'updateManyCmCampaign',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CmCampaignUpdateManyMutationInput'),
      where: 'CmCampaignWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmCampaign.updateMany(args as any)
    },
  },
)

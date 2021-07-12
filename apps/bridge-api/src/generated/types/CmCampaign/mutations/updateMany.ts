import { mutationField, nonNull } from 'nexus'

export const CmCampaignUpdateManyMutation = mutationField(
  'updateManyCmCampaign',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CmCampaignWhereInput',
      data: nonNull('CmCampaignUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmCampaign.updateMany(args as any)
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const CmCampaignUpsertOneMutation = mutationField(
  'upsertOneCmCampaign',
  {
    type: nonNull('CmCampaign'),
    args: {
      where: nonNull('CmCampaignWhereUniqueInput'),
      create: nonNull('CmCampaignCreateInput'),
      update: nonNull('CmCampaignUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmCampaign.upsert({
        ...args,
        ...select,
      })
    },
  },
)

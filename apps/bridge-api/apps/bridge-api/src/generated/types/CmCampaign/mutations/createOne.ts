import { mutationField, nonNull } from 'nexus'

export const CmCampaignCreateOneMutation = mutationField(
  'createOneCmCampaign',
  {
    type: nonNull('CmCampaign'),
    args: {
      data: nonNull('CmCampaignCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cmCampaign.create({
        data,
        ...select,
      })
    },
  },
)

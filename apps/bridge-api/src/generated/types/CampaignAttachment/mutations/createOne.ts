import { mutationField, nonNull } from 'nexus'

export const CampaignAttachmentCreateOneMutation = mutationField(
  'createOneCampaignAttachment',
  {
    type: nonNull('CampaignAttachment'),
    args: {
      data: nonNull('CampaignAttachmentCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.campaignAttachment.create({
        data,
        ...select,
      })
    },
  },
)

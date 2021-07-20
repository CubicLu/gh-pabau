import { mutationField, nonNull } from 'nexus'

export const CampaignAttachmentDeleteOneMutation = mutationField(
  'deleteOneCampaignAttachment',
  {
    type: 'CampaignAttachment',
    args: {
      where: nonNull('CampaignAttachmentWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.campaignAttachment.delete({
        where,
        ...select,
      })
    },
  },
)

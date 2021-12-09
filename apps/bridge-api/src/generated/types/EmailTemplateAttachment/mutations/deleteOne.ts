import { mutationField, nonNull } from 'nexus'

export const EmailTemplateAttachmentDeleteOneMutation = mutationField(
  'deleteOneEmailTemplateAttachment',
  {
    type: 'EmailTemplateAttachment',
    args: {
      where: nonNull('EmailTemplateAttachmentWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.emailTemplateAttachment.delete({
        where,
        ...select,
      })
    },
  },
)

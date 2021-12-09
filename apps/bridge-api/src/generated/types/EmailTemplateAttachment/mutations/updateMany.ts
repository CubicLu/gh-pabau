import { mutationField, nonNull } from 'nexus'

export const EmailTemplateAttachmentUpdateManyMutation = mutationField(
  'updateManyEmailTemplateAttachment',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('EmailTemplateAttachmentUpdateManyMutationInput'),
      where: 'EmailTemplateAttachmentWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.emailTemplateAttachment.updateMany(args as any)
    },
  },
)

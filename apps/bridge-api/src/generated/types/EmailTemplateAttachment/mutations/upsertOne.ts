import { mutationField, nonNull } from 'nexus'

export const EmailTemplateAttachmentUpsertOneMutation = mutationField(
  'upsertOneEmailTemplateAttachment',
  {
    type: nonNull('EmailTemplateAttachment'),
    args: {
      where: nonNull('EmailTemplateAttachmentWhereUniqueInput'),
      create: nonNull('EmailTemplateAttachmentCreateInput'),
      update: nonNull('EmailTemplateAttachmentUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.emailTemplateAttachment.upsert({
        ...args,
        ...select,
      })
    },
  },
)

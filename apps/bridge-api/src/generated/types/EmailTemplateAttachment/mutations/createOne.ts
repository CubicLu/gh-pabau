import { mutationField, nonNull } from 'nexus'

export const EmailTemplateAttachmentCreateOneMutation = mutationField(
  'createOneEmailTemplateAttachment',
  {
    type: nonNull('EmailTemplateAttachment'),
    args: {
      data: nonNull('EmailTemplateAttachmentCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.emailTemplateAttachment.create({
        data,
        ...select,
      })
    },
  },
)

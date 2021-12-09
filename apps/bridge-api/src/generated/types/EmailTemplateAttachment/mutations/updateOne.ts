import { mutationField, nonNull } from 'nexus'

export const EmailTemplateAttachmentUpdateOneMutation = mutationField(
  'updateOneEmailTemplateAttachment',
  {
    type: nonNull('EmailTemplateAttachment'),
    args: {
      data: nonNull('EmailTemplateAttachmentUpdateInput'),
      where: nonNull('EmailTemplateAttachmentWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.emailTemplateAttachment.update({
        where,
        data,
        ...select,
      })
    },
  },
)

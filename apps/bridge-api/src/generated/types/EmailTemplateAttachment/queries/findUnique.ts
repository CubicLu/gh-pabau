import { queryField, nonNull } from 'nexus'

export const EmailTemplateAttachmentFindUniqueQuery = queryField(
  'findUniqueEmailTemplateAttachment',
  {
    type: 'EmailTemplateAttachment',
    args: {
      where: nonNull('EmailTemplateAttachmentWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.emailTemplateAttachment.findUnique({
        where,
        ...select,
      })
    },
  },
)

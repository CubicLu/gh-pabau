import { queryField, nonNull, list } from 'nexus'

export const EmailTemplateAttachmentFindCountQuery = queryField(
  'findManyEmailTemplateAttachmentCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'EmailTemplateAttachmentWhereInput',
      orderBy: list('EmailTemplateAttachmentOrderByWithRelationInput'),
      cursor: 'EmailTemplateAttachmentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('EmailTemplateAttachmentScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.emailTemplateAttachment.count(args as any)
    },
  },
)

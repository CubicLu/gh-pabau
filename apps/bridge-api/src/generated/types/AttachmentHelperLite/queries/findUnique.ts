import { queryField, nonNull } from 'nexus'

export const AttachmentHelperLiteFindUniqueQuery = queryField(
  'findUniqueAttachmentHelperLite',
  {
    type: 'AttachmentHelperLite',
    args: {
      where: nonNull('AttachmentHelperLiteWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.attachmentHelperLite.findUnique({
        where,
        ...select,
      })
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const AttachmentHelperLiteUpsertOneMutation = mutationField(
  'upsertOneAttachmentHelperLite',
  {
    type: nonNull('AttachmentHelperLite'),
    args: {
      where: nonNull('AttachmentHelperLiteWhereUniqueInput'),
      create: nonNull('AttachmentHelperLiteCreateInput'),
      update: nonNull('AttachmentHelperLiteUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.attachmentHelperLite.upsert({
        ...args,
        ...select,
      })
    },
  },
)

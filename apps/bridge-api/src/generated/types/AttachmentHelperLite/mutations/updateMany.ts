import { mutationField, nonNull } from 'nexus'

export const AttachmentHelperLiteUpdateManyMutation = mutationField(
  'updateManyAttachmentHelperLite',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'AttachmentHelperLiteWhereInput',
      data: nonNull('AttachmentHelperLiteUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.attachmentHelperLite.updateMany(args as any)
    },
  },
)

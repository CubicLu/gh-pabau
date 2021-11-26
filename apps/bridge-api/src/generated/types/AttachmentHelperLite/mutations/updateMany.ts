import { mutationField, nonNull } from 'nexus'

export const AttachmentHelperLiteUpdateManyMutation = mutationField(
  'updateManyAttachmentHelperLite',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('AttachmentHelperLiteUpdateManyMutationInput'),
      where: 'AttachmentHelperLiteWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.attachmentHelperLite.updateMany(args as any)
    },
  },
)

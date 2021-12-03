import { mutationField, nonNull } from 'nexus'

export const AttachmentHelperLiteUpdateOneMutation = mutationField(
  'updateOneAttachmentHelperLite',
  {
    type: nonNull('AttachmentHelperLite'),
    args: {
      data: nonNull('AttachmentHelperLiteUpdateInput'),
      where: nonNull('AttachmentHelperLiteWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.attachmentHelperLite.update({
        where,
        data,
        ...select,
      })
    },
  },
)

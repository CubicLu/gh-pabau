import { mutationField, nonNull } from 'nexus'

export const AttachmentHelperLiteUpdateOneMutation = mutationField(
  'updateOneAttachmentHelperLite',
  {
    type: nonNull('AttachmentHelperLite'),
    args: {
      where: nonNull('AttachmentHelperLiteWhereUniqueInput'),
      data: nonNull('AttachmentHelperLiteUpdateInput'),
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

import { mutationField, nonNull } from 'nexus'

export const AttachmentHelperLiteCreateOneMutation = mutationField(
  'createOneAttachmentHelperLite',
  {
    type: nonNull('AttachmentHelperLite'),
    args: {
      data: nonNull('AttachmentHelperLiteCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.attachmentHelperLite.create({
        data,
        ...select,
      })
    },
  },
)

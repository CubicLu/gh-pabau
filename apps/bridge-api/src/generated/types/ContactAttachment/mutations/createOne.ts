import { mutationField, nonNull } from 'nexus'

export const ContactAttachmentCreateOneMutation = mutationField(
  'createOneContactAttachment',
  {
    type: nonNull('ContactAttachment'),
    args: {
      data: nonNull('ContactAttachmentCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.contactAttachment.create({
        data,
        ...select,
      })
    },
  },
)

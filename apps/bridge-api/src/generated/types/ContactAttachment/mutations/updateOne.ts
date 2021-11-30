import { mutationField, nonNull } from 'nexus'

export const ContactAttachmentUpdateOneMutation = mutationField(
  'updateOneContactAttachment',
  {
    type: nonNull('ContactAttachment'),
    args: {
      data: nonNull('ContactAttachmentUpdateInput'),
      where: nonNull('ContactAttachmentWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.contactAttachment.update({
        where,
        data,
        ...select,
      })
    },
  },
)

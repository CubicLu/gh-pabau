import { mutationField, nonNull } from 'nexus'

export const ContactAttachmentUpdateOneMutation = mutationField(
  'updateOneContactAttachment',
  {
    type: nonNull('ContactAttachment'),
    args: {
      where: nonNull('ContactAttachmentWhereUniqueInput'),
      data: nonNull('ContactAttachmentUpdateInput'),
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

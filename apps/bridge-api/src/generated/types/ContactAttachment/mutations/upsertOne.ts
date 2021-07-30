import { mutationField, nonNull } from 'nexus'

export const ContactAttachmentUpsertOneMutation = mutationField(
  'upsertOneContactAttachment',
  {
    type: nonNull('ContactAttachment'),
    args: {
      where: nonNull('ContactAttachmentWhereUniqueInput'),
      create: nonNull('ContactAttachmentCreateInput'),
      update: nonNull('ContactAttachmentUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactAttachment.upsert({
        ...args,
        ...select,
      })
    },
  },
)

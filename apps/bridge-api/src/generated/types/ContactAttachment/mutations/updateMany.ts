import { mutationField, nonNull } from 'nexus'

export const ContactAttachmentUpdateManyMutation = mutationField(
  'updateManyContactAttachment',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ContactAttachmentWhereInput',
      data: nonNull('ContactAttachmentUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.contactAttachment.updateMany(args as any)
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const ContactAttachmentUpdateManyMutation = mutationField(
  'updateManyContactAttachment',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ContactAttachmentUpdateManyMutationInput'),
      where: 'ContactAttachmentWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.contactAttachment.updateMany(args as any)
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const ContactAttachmentDeleteOneMutation = mutationField(
  'deleteOneContactAttachment',
  {
    type: 'ContactAttachment',
    args: {
      where: nonNull('ContactAttachmentWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.contactAttachment.delete({
        where,
        ...select,
      })
    },
  },
)

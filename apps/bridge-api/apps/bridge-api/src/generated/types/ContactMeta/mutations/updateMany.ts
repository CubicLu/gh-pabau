import { mutationField, nonNull } from 'nexus'

export const ContactMetaUpdateManyMutation = mutationField(
  'updateManyContactMeta',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ContactMetaWhereInput',
      data: nonNull('ContactMetaUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.contactMeta.updateMany(args as any)
    },
  },
)

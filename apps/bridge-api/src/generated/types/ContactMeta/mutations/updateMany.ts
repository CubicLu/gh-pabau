import { mutationField, nonNull } from 'nexus'

export const ContactMetaUpdateManyMutation = mutationField(
  'updateManyContactMeta',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ContactMetaUpdateManyMutationInput'),
      where: 'ContactMetaWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.contactMeta.updateMany(args as any)
    },
  },
)

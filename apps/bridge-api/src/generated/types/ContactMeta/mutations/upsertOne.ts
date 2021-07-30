import { mutationField, nonNull } from 'nexus'

export const ContactMetaUpsertOneMutation = mutationField(
  'upsertOneContactMeta',
  {
    type: nonNull('ContactMeta'),
    args: {
      where: nonNull('ContactMetaWhereUniqueInput'),
      create: nonNull('ContactMetaCreateInput'),
      update: nonNull('ContactMetaUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactMeta.upsert({
        ...args,
        ...select,
      })
    },
  },
)

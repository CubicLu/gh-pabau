import { mutationField, nonNull } from 'nexus'

export const ContactMetaCreateOneMutation = mutationField(
  'createOneContactMeta',
  {
    type: nonNull('ContactMeta'),
    args: {
      data: nonNull('ContactMetaCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.contactMeta.create({
        data,
        ...select,
      })
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const ContactMetaUpdateOneMutation = mutationField(
  'updateOneContactMeta',
  {
    type: nonNull('ContactMeta'),
    args: {
      where: nonNull('ContactMetaWhereUniqueInput'),
      data: nonNull('ContactMetaUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.contactMeta.update({
        where,
        data,
        ...select,
      })
    },
  },
)

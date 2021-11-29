import { mutationField, nonNull } from 'nexus'

export const ContactMetaUpdateOneMutation = mutationField(
  'updateOneContactMeta',
  {
    type: nonNull('ContactMeta'),
    args: {
      data: nonNull('ContactMetaUpdateInput'),
      where: nonNull('ContactMetaWhereUniqueInput'),
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

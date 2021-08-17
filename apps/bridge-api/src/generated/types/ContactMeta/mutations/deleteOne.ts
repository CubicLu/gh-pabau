import { mutationField, nonNull } from 'nexus'

export const ContactMetaDeleteOneMutation = mutationField(
  'deleteOneContactMeta',
  {
    type: 'ContactMeta',
    args: {
      where: nonNull('ContactMetaWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.contactMeta.delete({
        where,
        ...select,
      })
    },
  },
)

import { queryField, nonNull } from 'nexus'

export const ContactMetaFindUniqueQuery = queryField('findUniqueContactMeta', {
  type: 'ContactMeta',
  args: {
    where: nonNull('ContactMetaWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.contactMeta.findUnique({
      where,
      ...select,
    })
  },
})

import { queryField, nonNull } from 'nexus'

export const ContactPackageFindUniqueQuery = queryField(
  'findUniqueContactPackage',
  {
    type: 'ContactPackage',
    args: {
      where: nonNull('ContactPackageWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.contactPackage.findUnique({
        where,
        ...select,
      })
    },
  },
)

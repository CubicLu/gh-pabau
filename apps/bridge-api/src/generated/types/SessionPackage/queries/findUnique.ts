import { queryField, nonNull } from 'nexus'

export const SessionPackageFindUniqueQuery = queryField(
  'findUniqueSessionPackage',
  {
    type: 'SessionPackage',
    args: {
      where: nonNull('SessionPackageWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.sessionPackage.findUnique({
        where,
        ...select,
      })
    },
  },
)

import { queryField, nonNull } from 'nexus'

export const ClasstypeMasterFindUniqueQuery = queryField(
  'findUniqueClasstypeMaster',
  {
    type: 'ClasstypeMaster',
    args: {
      where: nonNull('ClasstypeMasterWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.classtypeMaster.findUnique({
        where,
        ...select,
      })
    },
  },
)

import { queryField, list } from 'nexus'

export const ClasstypeMasterFindFirstQuery = queryField(
  'findFirstClasstypeMaster',
  {
    type: 'ClasstypeMaster',
    args: {
      where: 'ClasstypeMasterWhereInput',
      orderBy: list('ClasstypeMasterOrderByInput'),
      cursor: 'ClasstypeMasterWhereUniqueInput',
      distinct: 'ClasstypeMasterScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.classtypeMaster.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

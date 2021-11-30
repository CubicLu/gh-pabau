import { queryField, list } from 'nexus'

export const ClasstypeMasterFindFirstQuery = queryField(
  'findFirstClasstypeMaster',
  {
    type: 'ClasstypeMaster',
    args: {
      where: 'ClasstypeMasterWhereInput',
      orderBy: list('ClasstypeMasterOrderByWithRelationInput'),
      cursor: 'ClasstypeMasterWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ClasstypeMasterScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.classtypeMaster.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

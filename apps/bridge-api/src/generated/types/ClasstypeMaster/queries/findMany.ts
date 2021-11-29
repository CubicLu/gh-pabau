import { queryField, nonNull, list } from 'nexus'

export const ClasstypeMasterFindManyQuery = queryField(
  'findManyClasstypeMaster',
  {
    type: nonNull(list(nonNull('ClasstypeMaster'))),
    args: {
      where: 'ClasstypeMasterWhereInput',
      orderBy: list('ClasstypeMasterOrderByWithRelationInput'),
      cursor: 'ClasstypeMasterWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ClasstypeMasterScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.classtypeMaster.findMany({
        ...args,
        ...select,
      })
    },
  },
)

import { queryField, list } from 'nexus'

export const CmContactCustomFindFirstQuery = queryField(
  'findFirstCmContactCustom',
  {
    type: 'CmContactCustom',
    args: {
      where: 'CmContactCustomWhereInput',
      orderBy: list('CmContactCustomOrderByInput'),
      cursor: 'CmContactCustomWhereUniqueInput',
      distinct: 'CmContactCustomScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactCustom.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

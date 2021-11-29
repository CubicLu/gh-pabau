import { queryField, list } from 'nexus'

export const CmContactCustomFindFirstQuery = queryField(
  'findFirstCmContactCustom',
  {
    type: 'CmContactCustom',
    args: {
      where: 'CmContactCustomWhereInput',
      orderBy: list('CmContactCustomOrderByWithRelationInput'),
      cursor: 'CmContactCustomWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmContactCustomScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactCustom.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

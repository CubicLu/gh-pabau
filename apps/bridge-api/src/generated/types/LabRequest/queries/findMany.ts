import { queryField, nonNull, list } from 'nexus'

export const LabRequestFindManyQuery = queryField('findManyLabRequest', {
  type: nonNull(list(nonNull('LabRequest'))),
  args: {
    where: 'LabRequestWhereInput',
    orderBy: list('LabRequestOrderByWithRelationInput'),
    cursor: 'LabRequestWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('LabRequestScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.labRequest.findMany({
      ...args,
      ...select,
    })
  },
})

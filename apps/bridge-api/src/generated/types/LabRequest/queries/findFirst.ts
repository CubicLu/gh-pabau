import { queryField, list } from 'nexus'

export const LabRequestFindFirstQuery = queryField('findFirstLabRequest', {
  type: 'LabRequest',
  args: {
    where: 'LabRequestWhereInput',
    orderBy: list('LabRequestOrderByWithRelationInput'),
    cursor: 'LabRequestWhereUniqueInput',
    distinct: 'LabRequestScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.labRequest.findFirst({
      ...args,
      ...select,
    })
  },
})

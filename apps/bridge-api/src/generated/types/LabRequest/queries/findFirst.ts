import { queryField, list } from 'nexus'

export const LabRequestFindFirstQuery = queryField('findFirstLabRequest', {
  type: 'LabRequest',
  args: {
    where: 'LabRequestWhereInput',
    orderBy: list('LabRequestOrderByWithRelationInput'),
    cursor: 'LabRequestWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('LabRequestScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.labRequest.findFirst({
      ...args,
      ...select,
    })
  },
})

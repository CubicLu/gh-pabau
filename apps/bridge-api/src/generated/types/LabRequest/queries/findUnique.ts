import { queryField, nonNull } from 'nexus'

export const LabRequestFindUniqueQuery = queryField('findUniqueLabRequest', {
  type: 'LabRequest',
  args: {
    where: nonNull('LabRequestWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.labRequest.findUnique({
      where,
      ...select,
    })
  },
})

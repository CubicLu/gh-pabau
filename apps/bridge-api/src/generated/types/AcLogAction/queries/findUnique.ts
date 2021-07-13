import { queryField, nonNull } from 'nexus'

export const AcLogActionFindUniqueQuery = queryField('findUniqueAcLogAction', {
  type: 'AcLogAction',
  args: {
    where: nonNull('AcLogActionWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.acLogAction.findUnique({
      where,
      ...select,
    })
  },
})

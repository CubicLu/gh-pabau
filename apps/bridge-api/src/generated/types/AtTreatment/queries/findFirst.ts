import { queryField, list } from 'nexus'

export const AtTreatmentFindFirstQuery = queryField('findFirstAtTreatment', {
  type: 'AtTreatment',
  args: {
    where: 'AtTreatmentWhereInput',
    orderBy: list('AtTreatmentOrderByInput'),
    cursor: 'AtTreatmentWhereUniqueInput',
    distinct: 'AtTreatmentScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atTreatment.findFirst({
      ...args,
      ...select,
    })
  },
})

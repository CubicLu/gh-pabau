import { queryField, list } from 'nexus'

export const AtTreatmentFindFirstQuery = queryField('findFirstAtTreatment', {
  type: 'AtTreatment',
  args: {
    where: 'AtTreatmentWhereInput',
    orderBy: list('AtTreatmentOrderByWithRelationInput'),
    cursor: 'AtTreatmentWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('AtTreatmentScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atTreatment.findFirst({
      ...args,
      ...select,
    })
  },
})

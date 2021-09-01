import { queryField, nonNull, list } from 'nexus'

export const AtTreatmentFindManyQuery = queryField('findManyAtTreatment', {
  type: nonNull(list(nonNull('AtTreatment'))),
  args: {
    where: 'AtTreatmentWhereInput',
    orderBy: list('AtTreatmentOrderByWithRelationInput'),
    cursor: 'AtTreatmentWhereUniqueInput',
    distinct: 'AtTreatmentScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atTreatment.findMany({
      ...args,
      ...select,
    })
  },
})

import { queryField, nonNull, list } from 'nexus'

export const AtTreatmentFindManyQuery = queryField('findManyAtTreatment', {
  type: nonNull(list(nonNull('AtTreatment'))),
  args: {
    where: 'AtTreatmentWhereInput',
    orderBy: list('AtTreatmentOrderByWithRelationInput'),
    cursor: 'AtTreatmentWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('AtTreatmentScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atTreatment.findMany({
      ...args,
      ...select,
    })
  },
})

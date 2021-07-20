import { queryField, nonNull } from 'nexus'

export const AtTreatmentFindUniqueQuery = queryField('findUniqueAtTreatment', {
  type: 'AtTreatment',
  args: {
    where: nonNull('AtTreatmentWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.atTreatment.findUnique({
      where,
      ...select,
    })
  },
})

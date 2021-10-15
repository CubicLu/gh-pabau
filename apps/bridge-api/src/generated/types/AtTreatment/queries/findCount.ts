import { queryField, nonNull, list } from 'nexus'

export const AtTreatmentFindCountQuery = queryField(
  'findManyAtTreatmentCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AtTreatmentWhereInput',
      orderBy: list('AtTreatmentOrderByInput'),
      cursor: 'AtTreatmentWhereUniqueInput',
      distinct: 'AtTreatmentScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.atTreatment.count(args as any)
    },
  },
)

import { queryField, nonNull, list } from 'nexus'

export const AtTreatmentFindCountQuery = queryField(
  'findManyAtTreatmentCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AtTreatmentWhereInput',
      orderBy: list('AtTreatmentOrderByWithRelationInput'),
      cursor: 'AtTreatmentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AtTreatmentScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.atTreatment.count(args as any)
    },
  },
)

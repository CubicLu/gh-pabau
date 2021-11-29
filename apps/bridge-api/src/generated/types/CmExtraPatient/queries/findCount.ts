import { queryField, nonNull, list } from 'nexus'

export const CmExtraPatientFindCountQuery = queryField(
  'findManyCmExtraPatientCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmExtraPatientWhereInput',
      orderBy: list('CmExtraPatientOrderByWithRelationInput'),
      cursor: 'CmExtraPatientWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmExtraPatientScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmExtraPatient.count(args as any)
    },
  },
)

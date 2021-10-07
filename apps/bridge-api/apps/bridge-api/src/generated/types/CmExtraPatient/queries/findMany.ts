import { queryField, nonNull, list } from 'nexus'

export const CmExtraPatientFindManyQuery = queryField(
  'findManyCmExtraPatient',
  {
    type: nonNull(list(nonNull('CmExtraPatient'))),
    args: {
      where: 'CmExtraPatientWhereInput',
      orderBy: list('CmExtraPatientOrderByWithRelationInput'),
      cursor: 'CmExtraPatientWhereUniqueInput',
      distinct: 'CmExtraPatientScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmExtraPatient.findMany({
        ...args,
        ...select,
      })
    },
  },
)

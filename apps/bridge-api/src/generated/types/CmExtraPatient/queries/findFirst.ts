import { queryField, list } from 'nexus'

export const CmExtraPatientFindFirstQuery = queryField(
  'findFirstCmExtraPatient',
  {
    type: 'CmExtraPatient',
    args: {
      where: 'CmExtraPatientWhereInput',
      orderBy: list('CmExtraPatientOrderByWithRelationInput'),
      cursor: 'CmExtraPatientWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmExtraPatientScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmExtraPatient.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

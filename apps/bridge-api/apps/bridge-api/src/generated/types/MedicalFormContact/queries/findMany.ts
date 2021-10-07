import { queryField, nonNull, list } from 'nexus'

export const MedicalFormContactFindManyQuery = queryField(
  'findManyMedicalFormContact',
  {
    type: nonNull(list(nonNull('MedicalFormContact'))),
    args: {
      where: 'MedicalFormContactWhereInput',
      orderBy: list('MedicalFormContactOrderByWithRelationInput'),
      cursor: 'MedicalFormContactWhereUniqueInput',
      distinct: 'MedicalFormContactScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalFormContact.findMany({
        ...args,
        ...select,
      })
    },
  },
)

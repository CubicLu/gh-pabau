import { queryField, nonNull, list } from 'nexus'

export const MedicalFormContactFindManyQuery = queryField(
  'findManyMedicalFormContact',
  {
    type: nonNull(list(nonNull('MedicalFormContact'))),
    args: {
      where: 'MedicalFormContactWhereInput',
      orderBy: list('MedicalFormContactOrderByWithRelationInput'),
      cursor: 'MedicalFormContactWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('MedicalFormContactScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalFormContact.findMany({
        ...args,
        ...select,
      })
    },
  },
)

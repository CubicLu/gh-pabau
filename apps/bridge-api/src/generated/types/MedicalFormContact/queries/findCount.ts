import { queryField, nonNull, list } from 'nexus'

export const MedicalFormContactFindCountQuery = queryField(
  'findManyMedicalFormContactCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'MedicalFormContactWhereInput',
      orderBy: list('MedicalFormContactOrderByWithRelationInput'),
      cursor: 'MedicalFormContactWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('MedicalFormContactScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.medicalFormContact.count(args as any)
    },
  },
)

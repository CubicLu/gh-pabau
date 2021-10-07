import { queryField, nonNull, list } from 'nexus'

export const MedicalFormFindCountQuery = queryField(
  'findManyMedicalFormCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'MedicalFormWhereInput',
      orderBy: list('MedicalFormOrderByWithRelationInput'),
      cursor: 'MedicalFormWhereUniqueInput',
      distinct: 'MedicalFormScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.medicalForm.count(args as any)
    },
  },
)

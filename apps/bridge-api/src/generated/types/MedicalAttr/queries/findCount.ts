import { queryField, nonNull, list } from 'nexus'

export const MedicalAttrFindCountQuery = queryField(
  'findManyMedicalAttrCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'MedicalAttrWhereInput',
      orderBy: list('MedicalAttrOrderByWithRelationInput'),
      cursor: 'MedicalAttrWhereUniqueInput',
      distinct: 'MedicalAttrScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.medicalAttr.count(args as any)
    },
  },
)

import { queryField, nonNull, list } from 'nexus'

export const MedicalAttrFindCountQuery = queryField(
  'findManyMedicalAttrCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'MedicalAttrWhereInput',
      orderBy: list('MedicalAttrOrderByWithRelationInput'),
      cursor: 'MedicalAttrWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('MedicalAttrScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.medicalAttr.count(args as any)
    },
  },
)

import { queryField, list } from 'nexus'

export const MedicalContactAttrAggregateQuery = queryField(
  'aggregateMedicalContactAttr',
  {
    type: 'AggregateMedicalContactAttr',
    args: {
      where: 'MedicalContactAttrWhereInput',
      orderBy: list('MedicalContactAttrOrderByWithRelationInput'),
      cursor: 'MedicalContactAttrWhereUniqueInput',
      distinct: 'MedicalContactAttrScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalContactAttr.aggregate({ ...args, ...select }) as any
    },
  },
)

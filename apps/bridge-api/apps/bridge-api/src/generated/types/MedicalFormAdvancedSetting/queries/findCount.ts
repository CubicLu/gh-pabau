import { queryField, nonNull, list } from 'nexus'

export const MedicalFormAdvancedSettingFindCountQuery = queryField(
  'findManyMedicalFormAdvancedSettingCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'MedicalFormAdvancedSettingWhereInput',
      orderBy: list('MedicalFormAdvancedSettingOrderByWithRelationInput'),
      cursor: 'MedicalFormAdvancedSettingWhereUniqueInput',
      distinct: 'MedicalFormAdvancedSettingScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.medicalFormAdvancedSetting.count(args as any)
    },
  },
)

import { queryField, nonNull, list } from 'nexus'

export const MedicalFormAdvancedSettingFindCountQuery = queryField(
  'findManyMedicalFormAdvancedSettingCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'MedicalFormAdvancedSettingWhereInput',
      orderBy: list('MedicalFormAdvancedSettingOrderByWithRelationInput'),
      cursor: 'MedicalFormAdvancedSettingWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('MedicalFormAdvancedSettingScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.medicalFormAdvancedSetting.count(args as any)
    },
  },
)

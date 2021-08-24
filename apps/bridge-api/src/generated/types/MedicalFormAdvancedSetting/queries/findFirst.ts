import { queryField, list } from 'nexus'

export const MedicalFormAdvancedSettingFindFirstQuery = queryField(
  'findFirstMedicalFormAdvancedSetting',
  {
    type: 'MedicalFormAdvancedSetting',
    args: {
      where: 'MedicalFormAdvancedSettingWhereInput',
      orderBy: list('MedicalFormAdvancedSettingOrderByInput'),
      cursor: 'MedicalFormAdvancedSettingWhereUniqueInput',
      distinct: 'MedicalFormAdvancedSettingScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalFormAdvancedSetting.findFirst({
        ...args,
        ...select,
      })
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const MedicalFormAdvancedSettingUpsertOneMutation = mutationField(
  'upsertOneMedicalFormAdvancedSetting',
  {
    type: nonNull('MedicalFormAdvancedSetting'),
    args: {
      where: nonNull('MedicalFormAdvancedSettingWhereUniqueInput'),
      create: nonNull('MedicalFormAdvancedSettingCreateInput'),
      update: nonNull('MedicalFormAdvancedSettingUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalFormAdvancedSetting.upsert({
        ...args,
        ...select,
      })
    },
  },
)

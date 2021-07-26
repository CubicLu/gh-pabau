import { mutationField, nonNull } from 'nexus'

export const MedicalFormAdvancedSettingCreateOneMutation = mutationField(
  'createOneMedicalFormAdvancedSetting',
  {
    type: nonNull('MedicalFormAdvancedSetting'),
    args: {
      data: nonNull('MedicalFormAdvancedSettingCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.medicalFormAdvancedSetting.create({
        data,
        ...select,
      })
    },
  },
)

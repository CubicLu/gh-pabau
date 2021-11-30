import { mutationField, nonNull } from 'nexus'

export const MedicalFormAdvancedSettingUpdateManyMutation = mutationField(
  'updateManyMedicalFormAdvancedSetting',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('MedicalFormAdvancedSettingUpdateManyMutationInput'),
      where: 'MedicalFormAdvancedSettingWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.medicalFormAdvancedSetting.updateMany(args as any)
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const MedicalContactAttrUpdateManyMutation = mutationField(
  'updateManyMedicalContactAttr',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'MedicalContactAttrWhereInput',
      data: nonNull('MedicalContactAttrUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.medicalContactAttr.updateMany(args as any)
    },
  },
)

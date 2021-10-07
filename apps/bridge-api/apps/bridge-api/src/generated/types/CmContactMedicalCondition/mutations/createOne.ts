import { mutationField, nonNull } from 'nexus'

export const CmContactMedicalConditionCreateOneMutation = mutationField(
  'createOneCmContactMedicalCondition',
  {
    type: nonNull('CmContactMedicalCondition'),
    args: {
      data: nonNull('CmContactMedicalConditionCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cmContactMedicalCondition.create({
        data,
        ...select,
      })
    },
  },
)

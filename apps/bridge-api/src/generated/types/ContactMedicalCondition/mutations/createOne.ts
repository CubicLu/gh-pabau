import { mutationField, nonNull } from 'nexus'

export const ContactMedicalConditionCreateOneMutation = mutationField(
  'createOneContactMedicalCondition',
  {
    type: nonNull('ContactMedicalCondition'),
    args: {
      data: nonNull('ContactMedicalConditionCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.contactMedicalCondition.create({
        data,
        ...select,
      })
    },
  },
)

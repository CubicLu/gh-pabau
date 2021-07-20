import { mutationField, nonNull } from 'nexus'

export const HealthcodeInsurerCreateOneMutation = mutationField(
  'createOneHealthcodeInsurer',
  {
    type: nonNull('HealthcodeInsurer'),
    args: {
      data: nonNull('HealthcodeInsurerCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.healthcodeInsurer.create({
        data,
        ...select,
      })
    },
  },
)

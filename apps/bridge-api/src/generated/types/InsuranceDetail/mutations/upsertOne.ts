import { mutationField, nonNull } from 'nexus'

export const InsuranceDetailUpsertOneMutation = mutationField(
  'upsertOneInsuranceDetail',
  {
    type: nonNull('InsuranceDetail'),
    args: {
      where: nonNull('InsuranceDetailWhereUniqueInput'),
      create: nonNull('InsuranceDetailCreateInput'),
      update: nonNull('InsuranceDetailUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.insuranceDetail.upsert({
        ...args,
        ...select,
      })
    },
  },
)

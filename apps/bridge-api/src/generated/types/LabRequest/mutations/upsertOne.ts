import { mutationField, nonNull } from 'nexus'

export const LabRequestUpsertOneMutation = mutationField(
  'upsertOneLabRequest',
  {
    type: nonNull('LabRequest'),
    args: {
      where: nonNull('LabRequestWhereUniqueInput'),
      create: nonNull('LabRequestCreateInput'),
      update: nonNull('LabRequestUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.labRequest.upsert({
        ...args,
        ...select,
      })
    },
  },
)

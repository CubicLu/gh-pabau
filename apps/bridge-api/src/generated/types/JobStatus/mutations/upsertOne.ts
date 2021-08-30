import { mutationField, nonNull } from 'nexus'

export const JobStatusUpsertOneMutation = mutationField('upsertOneJobStatus', {
  type: nonNull('JobStatus'),
  args: {
    where: nonNull('JobStatusWhereUniqueInput'),
    create: nonNull('JobStatusCreateInput'),
    update: nonNull('JobStatusUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.jobStatus.upsert({
      ...args,
      ...select,
    })
  },
})

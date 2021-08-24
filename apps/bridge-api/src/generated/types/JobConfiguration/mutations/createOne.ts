import { mutationField, nonNull } from 'nexus'

export const JobConfigurationCreateOneMutation = mutationField(
  'createOneJobConfiguration',
  {
    type: nonNull('JobConfiguration'),
    args: {
      data: nonNull('JobConfigurationCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.jobConfiguration.create({
        data,
        ...select,
      })
    },
  },
)

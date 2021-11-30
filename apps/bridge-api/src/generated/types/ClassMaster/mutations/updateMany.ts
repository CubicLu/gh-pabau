import { mutationField, nonNull } from 'nexus'

export const ClassMasterUpdateManyMutation = mutationField(
  'updateManyClassMaster',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ClassMasterUpdateManyMutationInput'),
      where: 'ClassMasterWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.classMaster.updateMany(args as any)
    },
  },
)

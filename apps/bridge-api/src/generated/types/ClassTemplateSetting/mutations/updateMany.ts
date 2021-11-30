import { mutationField, nonNull } from 'nexus'

export const ClassTemplateSettingUpdateManyMutation = mutationField(
  'updateManyClassTemplateSetting',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ClassTemplateSettingUpdateManyMutationInput'),
      where: 'ClassTemplateSettingWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.classTemplateSetting.updateMany(args as any)
    },
  },
)

import { mutationField, nonNull } from 'nexus'

export const ClassTemplateSettingUpsertOneMutation = mutationField(
  'upsertOneClassTemplateSetting',
  {
    type: nonNull('ClassTemplateSetting'),
    args: {
      where: nonNull('ClassTemplateSettingWhereUniqueInput'),
      create: nonNull('ClassTemplateSettingCreateInput'),
      update: nonNull('ClassTemplateSettingUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.classTemplateSetting.upsert({
        ...args,
        ...select,
      })
    },
  },
)

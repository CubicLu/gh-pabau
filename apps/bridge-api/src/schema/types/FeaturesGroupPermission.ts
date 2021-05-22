import { extendType, intArg, nonNull, stringArg, objectType } from 'nexus'
import { Context } from '../../context'

interface GroupPermissions {
  id: number
  company_id: number
  group_id: number
  module_permissions: string
  feature_permissions: string
  report_permissions: string
}

interface GroupPermissionInput {
  group_id: number
  features_permission: string
}

const UpdateGroupPermission = objectType({
  name: 'UpdateGroupPermission',
  definition(t) {
    t.int('count')
  },
})

export const PabauGroupPermissionFeaturePermission = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('upsertGroupPermissionFeatureByGroupId', {
      type: UpdateGroupPermission,
      description:
        'Creates/Updates a group permission for feature permissions to the provided group_id',
      args: {
        features_permission: nonNull(stringArg()),
        group_id: nonNull(intArg()),
      },
      async resolve(_, input: GroupPermissionInput, ctx: Context) {
        try {
          const inputFeaturePermission = JSON.parse(input.features_permission)
          const groupPermissions: GroupPermissions = await ctx.prisma.groupPermission.findFirst(
            {
              where: { group_id: input.group_id },
            }
          )
          let permission
          if (groupPermissions?.feature_permissions) {
            permission = JSON.parse(groupPermissions.feature_permissions)
            if (permission) {
              inputFeaturePermission.field.map((inputField) => {
                const data = permission.field.find(
                  (thread) => thread.key === inputField.key
                )
                if (data) {
                  data.value = inputField.value
                } else {
                  permission.field.push(inputField)
                }
                return inputField
              })
            }
          } else {
            permission = inputFeaturePermission
          }

          const response = await (groupPermissions?.id
            ? ctx.prisma.groupPermission.update({
                where: {
                  id: groupPermissions.id,
                },
                data: {
                  feature_permissions: JSON.stringify(permission),
                },
              })
            : ctx.prisma.groupPermission.create({
                data: {
                  group_id: input.group_id,
                  company_id: ctx.user.company,
                  feature_permissions: JSON.stringify(permission),
                  report_permissions: '',
                  module_permissions: '',
                },
              }))
          return {
            count: response ? 1 : 0,
          }
        } catch (error) {
          return error
        }
      },
    })
  },
})

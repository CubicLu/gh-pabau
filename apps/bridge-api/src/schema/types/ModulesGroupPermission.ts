import { booleanArg, stringArg, extendType, intArg, nonNull } from 'nexus'
import { Context } from '../../context'

interface UserPermissionInput {
  group_id: number
  page_ids: string
  checked: boolean
  report_ids?: string
}

export const PabauUserPermission = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('upsertManyUsersPermissionByGroupId', {
      type: 'Boolean',
      description:
        'Creates/deletes a many users permission and create/updates group permission for modules_permission belonging to the provided group_id',
      args: {
        group_id: nonNull(intArg()),
        page_ids: nonNull(stringArg()),
        checked: nonNull(booleanArg()),
        report_ids: stringArg(),
      },
      async resolve(_, input: UserPermissionInput, ctx: Context) {
        try {
          const pageIds = input.page_ids.split(',')
          if (input.checked) {
            const pages = pageIds.map((id) => {
              return Number.parseInt(id)
            })

            const user = await ctx.prisma.$queryRaw(
              `SELECT user_id from user_group_members where group_id = ${input.group_id}`
            )
            if (user.length > 0) {
              const userIds = user.map((thread) => thread.user_id)
              const userStringIds = userIds.join(',')

              const userPages = await ctx.prisma.$queryRaw(
                `SELECT id, user , page from user_permissions where page IN (${input.page_ids}) and user IN (${userStringIds})`
              )

              const insertArray = []
              for (const id of userIds) {
                const data = new Set(
                  userPages
                    .filter((thread) => thread.user === id)
                    .map((thread) => thread.page)
                )

                for (const pageId of pages) {
                  if (!data.has(pageId)) {
                    insertArray.push(`(${id}, ${pageId})`)
                  }
                }
              }

              if (insertArray.length > 0) {
                await ctx.prisma.$queryRaw(
                  `INSERT INTO user_permissions(user, page)  VALUES ${insertArray.join(
                    ','
                  )}`
                )
              }
            }
          } else {
            await ctx.prisma.$queryRaw(
              `DELETE FROM user_permissions
               WHERE page IN (${input.page_ids}) AND
               user IN (SELECT user_id from user_group_members where group_id = ${input.group_id})`
            )
            if (input.report_ids) {
              await ctx.prisma.$queryRaw(
                `DELETE FROM user_reports
               WHERE report_id IN (${input.report_ids}) AND
               occupier = ${ctx.req.authenticatedUser.company} AND
               user_id IN (SELECT user_id from user_group_members where group_id = ${input.group_id})`
              )
            }
          }

          const groupPermissions = await ctx.prisma.$queryRaw(
            `SELECT * FROM group_permissions where group_id = ${input.group_id}`
          )

          let report_permission = []
          let module_permission = []
          if (groupPermissions.length > 0) {
            if (input.report_ids) {
              report_permission = getPermission(
                input.checked,
                input.report_ids.split(','),
                groupPermissions[0].report_permissions
              )
            } else {
              report_permission = groupPermissions[0]?.report_permissions.split(
                ','
              )
            }

            module_permission = getPermission(
              input.checked,
              pageIds,
              groupPermissions[0].module_permissions
            )
          } else {
            module_permission = pageIds
          }

          await ctx.prisma.$queryRaw(`
            INSERT INTO group_permissions(group_id, company_id, report_permissions,module_permissions,feature_permissions)
            VALUES (
                ${input.group_id},
                ${ctx.req.authenticatedUser.company},
                '${report_permission.join(',')}',
                '${module_permission.join(',')}',
                 ''
            )
            ON DUPLICATE KEY UPDATE report_permissions = '${report_permission.join(
              ','
            )}', module_permissions ='${module_permission.join(',')}'`)

          return true
        } catch (error) {
          return error
        }
      },
    })
  },
})

const getPermission = (checked, inputPermission, groupPermission) => {
  let newPermission = []
  if (groupPermission && inputPermission.length > 0) {
    newPermission = groupPermission.split(',')
    if (newPermission.length > 0) {
      inputPermission.map((reportId) => {
        const data = newPermission.find((thread) => thread === reportId)
        if (data && !checked) {
          newPermission = newPermission.filter((thread) => thread !== reportId)
        } else if (!data && checked) {
          newPermission.push(reportId)
        }
        return reportId
      })
    }
  } else {
    if (checked && inputPermission) {
      newPermission = inputPermission
    }
  }

  return newPermission
}

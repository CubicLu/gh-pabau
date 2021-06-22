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

          const user = await ctx.prisma.userGroupMember.findMany({
            where: {
              group_id: {
                equals: input.group_id,
              },
            },
          })

          if (input.checked) {
            const pages = pageIds.map((id) => {
              return Number.parseInt(id)
            })

            if (user.length > 0) {
              const userIds = user.map((thread) => thread.user_id)

              const userPages = await ctx.prisma.userPermission.findMany({
                where: {
                  page: {
                    in: pages,
                  },
                  user: {
                    in: userIds,
                  },
                },
              })

              const insertArray = []
              for (const id of userIds) {
                const data = new Set(
                  userPages
                    .filter((thread) => thread.user === id)
                    .map((thread) => thread.page)
                )

                for (const pageId of pages) {
                  if (!data.has(pageId)) {
                    insertArray.push({ id, pageId })
                  }
                }
              }

              if (insertArray.length > 0) {
                const data = []
                for (const thread of insertArray) {
                  data.push({
                    user: thread.id,
                    page: thread.pageId,
                  })
                }
                await ctx.prisma.userPermission.createMany({
                  data,
                })
              }
            }
          } else {
            const userIds = user.map((thread) => thread.user_id)
            const pageIds = input.page_ids
              .split(',')
              .map((thread) => Number.parseInt(thread))

            await ctx.prisma.userPermission.deleteMany({
              where: {
                page: { in: pageIds },
                user: { in: userIds },
              },
            })

            if (input.report_ids) {
              const reportIds = input.report_ids
                .split(',')
                .map((thread) => Number.parseInt(thread))
              await ctx.prisma.userReport.deleteMany({
                where: {
                  report_id: { in: reportIds },
                  company_id: ctx.authenticated.company,
                  user_id: { in: userIds },
                },
              })
            }
          }

          //Group permission upsert
          const groupPermissions = await ctx.prisma.groupPermission.findFirst({
            where: {
              group_id: {
                equals: input.group_id,
              },
            },
          })

          let report_permission = []
          let module_permission = []
          if (groupPermissions) {
            if (input.report_ids) {
              report_permission = getPermission(
                input.checked,
                input.report_ids,
                groupPermissions.report_permissions
              )
            } else {
              if (groupPermissions.report_permissions) {
                report_permission = JSON.parse(
                  groupPermissions.report_permissions
                )
              }
            }

            module_permission = getPermission(
              input.checked,
              pageIds,
              groupPermissions.module_permissions
            )
          } else {
            module_permission = pageIds
          }

          const modulePermission =
            module_permission.length > 0
              ? JSON.stringify(module_permission)
              : ''

          const reportPermission =
            report_permission.length > 0
              ? JSON.stringify(report_permission)
              : ''

          const response = await (groupPermissions?.id
            ? ctx.prisma.groupPermission.update({
                where: {
                  id: groupPermissions.id,
                },
                data: {
                  module_permissions: modulePermission,
                  report_permissions: reportPermission,
                },
              })
            : ctx.prisma.groupPermission.create({
                data: {
                  group_id: input.group_id,
                  company_id: ctx.authenticated.company,
                  report_permissions: reportPermission,
                  feature_permissions: '',
                  module_permissions: modulePermission,
                },
              }))

          return !!response
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
    newPermission = JSON.parse(groupPermission)
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

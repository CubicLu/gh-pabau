import { booleanArg, stringArg, extendType, intArg, nonNull } from 'nexus'
import { Context } from '../../context'

interface UserReportsInput {
  group_id: number
  report_ids: string
  checked: boolean
}

export const PabauUserReports = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('upsertManyUsersReportsByGroupId', {
      type: 'Boolean',
      description:
        'Creates/deletes a many users reports permission and create/updates group permission for reports_permission belonging to the provided group_id',
      args: {
        group_id: nonNull(intArg()),
        report_ids: nonNull(stringArg()),
        checked: nonNull(booleanArg()),
      },
      async resolve(_, input: UserReportsInput, ctx: Context) {
        try {
          const reports = input.report_ids.split(',')

          if (input.checked) {
            const reportIds = reports.map((id) => {
              return Number.parseInt(id)
            })

            const user = await ctx.prisma.$queryRaw(
              `SELECT user_id from user_group_members where group_id = ${input.group_id}`
            )
            if (user.length > 0) {
              const userIds = user.map((thread) => thread.user_id)
              const userStringIds = userIds.join(',')

              const userReports = await ctx.prisma.$queryRaw(
                `SELECT id, user_id , report_id from user_reports where report_id IN (${input.report_ids}) and user_id IN (${userStringIds})`
              )

              const insertArray = []
              for (const id of userIds) {
                const data = new Set(
                  userReports
                    .filter((thread) => thread.user_id === id)
                    .map((thread) => thread.report_id)
                )

                for (const reportId of reportIds) {
                  if (!data.has(reportId)) {
                    insertArray.push(
                      `(${ctx.user.company}, ${id}, ${reportId})`
                    )
                  }
                }
              }

              if (insertArray.length > 0) {
                await ctx.prisma.$queryRaw(
                  `INSERT INTO user_reports(occupier, user_id, report_id)  VALUES ${insertArray.join(
                    ','
                  )}`
                )
              }
            }
          } else {
            await ctx.prisma.$queryRaw(
              `DELETE FROM user_reports
               WHERE report_id IN (${input.report_ids}) AND
               occupier = ${ctx.user.company} AND
               user_id IN (SELECT user_id from user_group_members where group_id = ${input.group_id})`
            )
          }

          const groupPermissions = await ctx.prisma.$queryRaw(
            `SELECT * FROM group_permissions where group_id = ${input.group_id}`
          )

          let reportPermission = []
          if (
            groupPermissions.length > 0 &&
            groupPermissions[0].report_permissions
          ) {
            reportPermission = groupPermissions[0].report_permissions.split(',')
            if (reportPermission.length > 0) {
              reports.map((reportId) => {
                const data = reportPermission.find(
                  (thread) => thread === reportId
                )
                if (data && !input.checked) {
                  reportPermission = reportPermission.filter(
                    (thread) => thread !== reportId
                  )
                } else if (!data && input.checked) {
                  reportPermission.push(reportId)
                }
                return reportId
              })
            }
          } else {
            if (input.checked) {
              reportPermission = reports
            }
          }

          await ctx.prisma.$queryRaw(`
            INSERT INTO group_permissions(group_id, company_id, report_permissions,feature_permissions, module_permissions)
            VALUES (${input.group_id}, ${
            ctx.user.company
          }, '${reportPermission.join(',')}', '', '')
            ON DUPLICATE KEY UPDATE report_permissions = '${reportPermission.join(
              ','
            )}'`)

          return true
        } catch (error) {
          return error
        }
      },
    })
  },
})

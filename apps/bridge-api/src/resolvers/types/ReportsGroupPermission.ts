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
          const reportIds = reports.map((id) => {
            return Number.parseInt(id)
          })
          const companyId = ctx.authenticated.company
          const user = await ctx.prisma.userGroupMember.findMany({
            where: {
              group_id: {
                equals: input.group_id,
              },
            },
          })
          const userIds = user.map((thread) => thread.user_id)

          if (input.checked) {
            if (user.length > 0) {
              const userReports = await ctx.prisma.userReport.findMany({
                where: {
                  report_id: { in: reportIds },
                  user_id: { in: userIds },
                },
              })

              const insertArray = []
              for (const userId of userIds) {
                const data = new Set(
                  userReports
                    .filter((thread) => thread.user_id === userId)
                    .map((thread) => thread.report_id)
                )

                for (const reportId of reportIds) {
                  if (!data.has(reportId)) {
                    insertArray.push({ companyId, userId, reportId })
                  }
                }
              }
              if (insertArray.length > 0) {
                const data = []
                for (const thread of insertArray) {
                  data.push({
                    company_id: thread.companyId,
                    user_id: thread.userId,
                    report_id: thread.reportId,
                    favorite: false,
                  })
                }
                await ctx.prisma.userReport.createMany({
                  data,
                })
              }
            }
          } else {
            await ctx.prisma.userReport.deleteMany({
              where: {
                report_id: { in: reportIds },
                company_id: ctx.authenticated.company,
                user_id: { in: userIds },
              },
            })
          }

          const groupPermissions = await ctx.prisma.groupPermission.findFirst({
            where: {
              group_id: {
                equals: input.group_id,
              },
            },
          })

          let reportPermission = []
          if (groupPermissions?.report_permissions) {
            reportPermission = JSON.parse(groupPermissions.report_permissions)
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

          const reportPermissionData =
            reportPermission.length > 0 ? JSON.stringify(reportPermission) : ''

          const response = await (groupPermissions?.id
            ? ctx.prisma.groupPermission.update({
                where: {
                  id: groupPermissions.id,
                },
                data: {
                  report_permissions: reportPermissionData,
                },
              })
            : ctx.prisma.groupPermission.create({
                data: {
                  group_id: input.group_id,
                  company_id: companyId,
                  report_permissions: reportPermissionData,
                  feature_permissions: '',
                  module_permissions: '',
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

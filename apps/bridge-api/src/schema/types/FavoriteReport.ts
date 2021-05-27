import {
  booleanArg,
  extendType,
  list,
  nonNull,
  objectType,
  stringArg,
} from 'nexus'
import { Context } from '../../context'

interface ReportInput {
  favorite: boolean
  report_code: string
}

const CustomReport = list(
  objectType({
    name: 'CustomReport',
    definition(t) {
      t.string('report_code')
      t.int('report_id')
      t.string('report_name')
      t.boolean('isPermission')
      t.boolean('favorite')
    },
  })
)

const UpdateUserReport = objectType({
  name: 'UpdateUserReport',
  definition(t) {
    t.string('report_code')
    t.int('affected_row')
    t.boolean('favorite')
  },
})
const reportPrefixes = new Set(['CO', 'FI', 'LE', 'MA', 'OT', 'ST', 'AD'])

export const FavoriteReport = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('upsertUserReportByReportCode', {
      type: UpdateUserReport,
      description:
        'Creates or updates one user report favorite for the currently authenticated company and user',
      args: {
        report_code: nonNull(stringArg()),
        favorite: nonNull(booleanArg()),
      },
      async resolve(_, input: ReportInput, ctx: Context) {
        const reportCode = input.report_code
        if (!reportCode) {
          throw new Error('Malformed Parameters')
        }
        try {
          const companyId = ctx.authenticated?.company
          const userId = ctx.authenticated?.user
          let reportId

          let searchingByID = true
          if (reportPrefixes.has(reportCode?.substr(0, 2))) {
            searchingByID = false
          }

          if (!searchingByID) {
            const report = await ctx.prisma.report.findFirst({
              where: {
                report_code: {
                  equals: input.report_code,
                },
              },
              select: {
                id: true,
              },
            })
            if (!report) {
              throw new Error('Invalid report code')
            }
            reportId = report.id
          } else {
            reportId = Number.parseInt(reportCode)
          }
          const userReport = await ctx.prisma.userReport.findFirst({
            where: {
              report_id: {
                equals: reportId,
              },
              user_id: {
                equals: userId,
              },
              company_id: {
                equals: companyId,
              },
            },
          })
          const response = await (userReport
            ? ctx.prisma.userReport.update({
                where: {
                  id: userReport.id,
                },
                data: {
                  favorite: {
                    set: input.favorite,
                  },
                },
              })
            : ctx.prisma.userReport.create({
                data: {
                  favorite: input.favorite,
                  company_id: companyId,
                  user_id: userId,
                  report_id: reportId,
                },
              }))
          return {
            affected_row: response ? 1 : 0,
            favorite: response.favorite,
            report_code: input.report_code,
          }
        } catch (error) {
          return error
        }
      },
    })
  },
})

export const FavoriteReportQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('findManyCustomReportWithPermissions', {
      type: CustomReport,
      description: 'Return list of custom report with user report permission',
      args: {},
      async resolve(_, input, ctx: Context) {
        try {
          const companyId = ctx.authenticated.company
          const userId = ctx.authenticated.user
          const temp = []

          const userAllReportPermission = await ctx.prisma.user.findFirst({
            where: {
              id: {
                equals: userId,
              },
              company_id: {
                equals: companyId,
              },
            },
            select: {
              all_reports: true,
            },
          })

          const customReport = await ctx.prisma.report.findMany({
            where: {
              deleted: {
                equals: 0,
              },
              company_id: {
                equals: companyId,
              },
            },
            orderBy: {
              name: 'asc',
            },
            select: {
              name: true,
              id: true,
              report_code: true,
              company_id: true,
            },
          })
          const userReportsData = await ctx.prisma.userReport.findMany({
            where: {
              user_id: {
                equals: userId,
              },
              company_id: {
                equals: companyId,
              },
            },
            select: {
              id: true,
              report_id: true,
              company_id: true,
              favorite: true,
            },
          })
          const favoriteReportId = []
          for (const userReport of userReportsData) {
            if (userReport.favorite) {
              favoriteReportId.push(userReport.report_id)
            }
          }
          if (userAllReportPermission.all_reports) {
            for (const report of customReport) {
              temp.push({
                report_id: report.id,
                report_code: report.report_code,
                report_name: report.name,
                isPermission: true,
                favorite: favoriteReportId.includes(report.id),
              })
            }

            return temp
          } else {
            const reportPermissionReportId = []
            for (const userReport of userReportsData) {
              reportPermissionReportId.push(userReport.report_id)
            }
            for (const report of customReport) {
              temp.push({
                report_id: report.id,
                report_code: report.report_code,
                report_name: report.name,
                isPermission: reportPermissionReportId.includes(report.id),
                favorite: favoriteReportId.includes(report.id),
              })
            }
          }
          return temp
        } catch (error) {
          return error
        }
      },
    })
  },
})

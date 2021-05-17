import { extendType, intArg, list, nonNull, stringArg } from 'nexus'
import fetch from 'node-fetch'
import { ReportInputDto, TrendReportInputDto } from '../../app/report'
import { Context } from '../../context'

export const Reports = extendType({
  type: 'Query',
  definition(t) {
    t.field('retrieveReport', {
      type: 'Json',
      args: {
        id: nonNull(stringArg()),
        start_date: nonNull(stringArg()),
        end_date: nonNull(stringArg()),
        location_id: intArg(),
        staffs: list('Int'),
        columns: list('String'),
      },
      async resolve(_, input: ReportInputDto, ctx: Context) {
        if (!input.id || !input.start_date || !input.end_date) {
          throw new Error('Malformed Parameters')
        }
        if (!ctx?.req?.authenticatedUser?.remote_url) {
          throw new Error('Malformed JWT')
        }
        try {
          const url = ctx?.req?.authenticatedUser?.remote_url
          const params = new URLSearchParams({
            id: input.id.toString(),
            start_date: input.start_date.toString(),
            end_date: input.end_date.toString(),
            location_id: input.location_id?.toString(),
            staffs: input.staffs?.toString(),
            columns: input.columns?.toString(),
            company_id: ctx.req.authenticatedUser.company.toString(),
            user_id: ctx.req.authenticatedUser.user.toString(),
          })
          console.log(`${url}/api/pabau2.php?${params}`)
          return await fetch(`${url}/api/pabau2.php?${params}`)
            .then((result) => result.json())
            .catch((error) => {
              throw new Error(error)
            })
        } catch (error) {
          return error
        }
      },
    })
    t.field('retrieveTrendReport', {
      type: 'Json',
      args: {
        start_date: nonNull(stringArg()),
        end_date: nonNull(stringArg()),
        location_id: intArg(),
        type: stringArg(),
        columns: list('String'),
      },
      async resolve(_, input: TrendReportInputDto, ctx: Context) {
        if (!input.start_date || !input.end_date) {
          throw new Error('Malformed Parameters')
        }
        if (!ctx?.req?.authenticatedUser?.remote_url) {
          throw new Error('Malformed JWT')
        }
        try {
          const url = ctx?.req?.authenticatedUser?.remote_url
          const params = new URLSearchParams({
            id: 'trend',
            start_date: input.start_date.toString(),
            end_date: input.end_date.toString(),
            location_id: input.location_id?.toString() ?? '0',
            type: input.type?.toString() ?? '',
            columns: input.columns?.toString() ?? '',
            company_id: ctx.req.authenticatedUser.company.toString(),
            user_id: ctx.req.authenticatedUser.user.toString(),
          })
          console.log(`${url}/api/pabau2.php?${params}`)
          return await fetch(`${url}/api/pabau2.php?${params}`)
            .then((result) => result.json())
            .catch((error) => {
              throw new Error(error)
            })
        } catch (error) {
          return error
        }
      },
    })
  },
})

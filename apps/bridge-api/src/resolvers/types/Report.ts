import { extendType, list, nonNull, stringArg } from 'nexus'
import fetch from 'node-fetch'
import { URLSearchParams } from 'node:url'
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
        location_ids: list('Int'),
        staff_ids: list('Int'),
        columns: list('String'),
      },
      async resolve(_, input: ReportInputDto, ctx: Context) {
        if (!input.id || !input.start_date || !input.end_date) {
          throw new Error('Malformed Parameters')
        }
        try {
          const url =
            ctx.authenticated.remote_url || 'https://prelive-crm.pabau.com/'
          const params = new URLSearchParams({
            id: input.id.toString(),
            start_date: input.start_date.toString(),
            end_date: input.end_date.toString(),
            location_ids: input.location_ids?.toString(),
            staff_ids: input.staff_ids?.toString(),
            columns: input.columns?.toString(),
            company_id: ctx.authenticated.company.toString(),
            user_id: ctx.authenticated.user.toString(),
          })
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
        location_ids: list('Int'),
        type: stringArg(),
        columns: list('String'),
        staff_ids: list('Int'),
      },
      async resolve(_, input: TrendReportInputDto, ctx: Context) {
        if (!input.start_date || !input.end_date) {
          throw new Error('Malformed Parameters')
        }
        try {
          const url =
            ctx.authenticated.remote_url || 'https://prelive-crm.pabau.com/'
          const params = new URLSearchParams({
            id: 'trend',
            start_date: input.start_date.toString(),
            end_date: input.end_date.toString(),
            location_ids: input.location_ids?.toString() ?? '0',
            type: input.type?.toString() ?? '',
            columns: input.columns?.toString() ?? '',
            staffs: input.staff_ids?.toString() ?? '',
            company_id: ctx.authenticated.company.toString(),
            user_id: ctx.authenticated.user.toString(),
          })
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

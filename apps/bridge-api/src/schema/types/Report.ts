import { extendType, nonNull, intArg } from 'nexus'
import { ReportInputDto } from '../../app/report'
import fetch from 'node-fetch'
import { Context } from '../../context'

export const Reports = extendType({
  type: 'Query',
  definition(t) {
    t.field('retrieveReport', {
      type: 'Json',
      args: {
        id: nonNull(intArg()),
        start_date: nonNull(intArg()),
        end_date: nonNull(intArg()),
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
          return await fetch(
            `${url}/api/pabau2.php?` +
              new URLSearchParams({
                id: input.id.toString(),
                start_date: input.start_date.toString(),
                end_date: input.end_date.toString(),
                company_id: ctx.req.authenticatedUser.company.toString(),
                user_id: ctx.req.authenticatedUser.user.toString(),
              })
          )
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

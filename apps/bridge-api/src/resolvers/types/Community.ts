import { extendType } from 'nexus'
import fetch from 'node-fetch'

export const FeatureRequestsWeeklyCount = extendType({
  type: 'Query',
  definition(t) {
    t.field('featureRequestsWeeklyAvg', {
      type: 'Int',
      description:
        'Retrieve the weekly average of feature requests from the Pabau community page',
      async resolve(_) {
        try {
          return fetch(`https://community.pabau.com/c/feature-requests/5.rss`)
            .then((result) =>
              result.text().then((text) => text.match(/<item>/g).length)
            )
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

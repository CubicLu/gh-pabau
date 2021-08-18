import { extendType } from 'nexus'
import { Context } from '../../context'

export const Version = extendType({
  type: 'Query',
  definition(t) {
    t.field('version', {
      description: 'Returns the server API version.',
      type: 'String',
      resolve(_root, _args, { version }: Context) {
        return version
      },
    })
  },
})

import { extendType } from 'nexus'

export const uploadImage = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('uploadImage', {
      type: 'String',
      async resolve() {
        return ['a', 'b', 'c']
      },
    })
  },
})

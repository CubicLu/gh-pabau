import { objectType } from 'nexus'

export const ClassSmsHistory = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ClassSmsHistory',
  definition(t) {
    t.int('id')
    t.int('class_id')
    t.int('user_id')
    t.string('message')
    t.string('datetime')
  },
})

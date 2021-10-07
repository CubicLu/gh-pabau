import { objectType } from 'nexus'

export const ClassNotes = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ClassNotes',
  definition(t) {
    t.int('id')
    t.int('class_id')
    t.string('note')
    t.string('author')
    t.boolean('public')
    t.string('avatar')
    t.string('post_date')
  },
})

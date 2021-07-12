import { objectType, inputObjectType } from 'nexus'

export const EmailNexusOutput = objectType({
  name: 'EmailNexusOutput',
  definition(t) {
    t.boolean('success')
  },
})

export const DynamicTemplateData = inputObjectType({
  name: 'DynamicTemplateData',
  definition(t) {
    t.nonNull.string('key')
    t.nonNull.string('value')
  },
})

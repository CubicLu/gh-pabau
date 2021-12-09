import { objectType } from 'nexus'

export const TemplateFolder = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'TemplateFolder',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('folder_name')
    t.string('folder_description')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.list.field('MessageTemplate', {
      type: 'MessageTemplate',
      args: {
        where: 'MessageTemplateWhereInput',
        orderBy: 'MessageTemplateOrderByWithRelationInput',
        cursor: 'MessageTemplateWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'MessageTemplateScalarFieldEnum',
      },
      resolve(root: any) {
        return root.MessageTemplate
      },
    })
    t.field('_count', {
      type: 'TemplateFolderCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})

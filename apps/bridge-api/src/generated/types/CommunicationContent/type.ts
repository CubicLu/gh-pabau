import { objectType } from 'nexus'

export const CommunicationContent = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CommunicationContent',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('hash')
    t.nullable.string('subject')
    t.nullable.string('body')
    t.list.field('Communications', {
      type: 'Communication',
      args: {
        where: 'CommunicationWhereInput',
        orderBy: 'CommunicationOrderByWithRelationInput',
        cursor: 'CommunicationWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CommunicationScalarFieldEnum',
      },
      resolve(root: any) {
        return root.Communications
      },
    })
    t.nullable.field('_count', {
      type: 'CommunicationContentCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})

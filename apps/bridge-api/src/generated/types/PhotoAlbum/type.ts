import { objectType } from 'nexus'

export const PhotoAlbum = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'PhotoAlbum',
  definition(t) {
    t.int('id')
    t.string('album_name')
    t.int('contact_id')
    t.int('company_id')
    t.nullable.string('album_type')
    t.nullable.field('creation_date', { type: 'DateTime' })
    t.nullable.field('modified_date', { type: 'DateTime' })
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.field('Contact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.Contact
      },
    })
    t.list.field('Photos', {
      type: 'ContactAttachment',
      args: {
        where: 'ContactAttachmentWhereInput',
        orderBy: 'ContactAttachmentOrderByWithRelationInput',
        cursor: 'ContactAttachmentWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ContactAttachmentScalarFieldEnum',
      },
      resolve(root: any) {
        return root.Photos
      },
    })
    t.nullable.field('_count', {
      type: 'PhotoAlbumCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})

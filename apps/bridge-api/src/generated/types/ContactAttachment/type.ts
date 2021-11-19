import { objectType } from 'nexus'

export const ContactAttachment = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ContactAttachment',
  definition(t) {
    t.int('id')
    t.string('linkref')
    t.int('contact_id')
    t.int('company_id')
    t.int('date')
    t.nullable.string('attach_name')
    t.nullable.int('user_id')
    t.string('attachment_type')
    t.nullable.string('sub_type')
    t.nullable.boolean('connect_public')
    t.nullable.boolean('website_public')
    t.nullable.string('attachment_title')
    t.nullable.boolean('cloud')
    t.nullable.int('custom_id')
    t.nullable.string('original_path')
    t.nullable.int('imported')
    t.nullable.int('booking_id')
    t.nullable.string('photo_type')
    t.nullable.string('attachment_size')
    t.nullable.int('broken')
    t.nullable.int('broken_check')
    t.nullable.string('old_linkref')
    t.nullable.int('in_folder')
    t.nullable.int('custom_contact_id')
    t.nullable.int('album_id')
    t.nullable.int('medical_form_id')
    t.nullable.string('tags')
    t.nullable.string('medical_uniqid')
    t.nullable.field('Contact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.Contact
      },
    })
    t.nullable.field('Practitioner', {
      type: 'User',
      resolve(root: any) {
        return root.Practitioner
      },
    })
    t.nullable.field('Album', {
      type: 'PhotoAlbum',
      resolve(root: any) {
        return root.Album
      },
    })
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})

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
    t.string('attach_name')
    t.int('user_id')
    t.string('attachment_type')
    t.boolean('connect_public')
    t.boolean('website_public')
    t.string('attachment_title')
    t.boolean('cloud')
    t.int('custom_id')
    t.string('original_path')
    t.int('imported')
    t.int('booking_id')
    t.string('photo_type')
    t.string('attachment_size')
    t.int('broken')
    t.int('broken_check')
    t.string('old_linkref')
    t.int('in_folder')
    t.int('custom_contact_id')
    t.int('album_id')
    t.int('medical_form_id')
    t.string('tags')
    t.string('medical_uniqid')
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
  },
})

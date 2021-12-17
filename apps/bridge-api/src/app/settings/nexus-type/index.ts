import { objectType } from 'nexus'

export const PublicCompanyServerResponse = objectType({
  name: 'PublicCompanyServerResponse',
  definition(t) {
    t.string('slug')
    t.string('remote_url')
    t.string('remote_connect')
  },
})

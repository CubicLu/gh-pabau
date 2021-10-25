import { extendType, objectType, stringArg } from 'nexus'
import { google } from 'googleapis'

const TokenType = objectType({
  name: 'TokenType',
  definition(t) {
    t.string('access_token')
    t.string('refresh_token')
    t.string('scope')
    t.string('token_type')
    t.float('expiry_date')
    t.string('email')
  },
})
const content = {
  installed: {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uris: ['https://prelive-crm.new.pabau.com/setup/senders'],
  },
}

export const AuthConnectionStore = extendType({
  type: 'Query',
  definition(t) {
    t.field('getRefreshToken', {
      type: TokenType,
      args: {
        token: stringArg(),
      },
      description: 'Get Refresh token and user email from access token',
      async resolve(_, input) {
        const getProfile = async (auth, refreshToken) => {
          const gmail = google.gmail({ version: 'v1', auth })
          if (!gmail) return
          const userData = await gmail.users.getProfile({
            userId: 'me',
          })
          return {
            ...refreshToken,
            email: userData.data.emailAddress,
          }
        }

        const { client_secret, client_id, redirect_uris } = content.installed
        const oAuth2Client = new google.auth.OAuth2(
          client_id,
          client_secret,
          redirect_uris[0]
        )

        const tokenData = await oAuth2Client.getToken(input.token)
        oAuth2Client.setCredentials(tokenData.tokens)

        return getProfile(oAuth2Client, tokenData.tokens)
      },
    })
  },
})

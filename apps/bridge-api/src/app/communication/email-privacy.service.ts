import { Context } from '../../context'

export const checkEmailPrivacy = async (ctx: Context, messages) => {
  for (const message of messages) {
    message.privacySetting = 0
    const email = await ctx.prisma.communicationRecipient.findFirst({
      where: {
        Communication: {
          Company: {
            id: {
              equals: ctx.authenticated.company,
            },
          },
        },
        remote_key: {
          equals: message.messageId,
        },
        to_address: {
          equals: message.email,
        },
      },
    })
    if (email) {
      message.privacySetting = 1
    }
  }
  return messages
}

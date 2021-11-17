import { Context } from '../../context'

export const checkEmailPrivacy = async (ctx: Context, messages) => {
  const communications = await ctx.prisma.communicationRecipient.findMany({
    select: {
      remote_key: true,
    },
    where: {
      Communication: {
        Company: {
          id: {
            equals: ctx.authenticated.company,
          },
        },
      },
      remote_key: {
        in: messages,
      },
    },
  })

  return messages.map((message) => {
    return {
      messageId: message,
      privacySetting:
        communications.find(
          (communication) => communication.remote_key === message
        ) !== undefined
          ? 1
          : 0,
    }
  })
}

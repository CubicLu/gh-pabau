import { extendType, intArg, objectType } from 'nexus'
import { Context } from '../../context'
import FormData from 'form-data'
import fetch from 'node-fetch'

const DeleteContactPhotoResponse = objectType({
  name: 'deleteContactPhotoResponse',
  definition(t) {
    t.boolean('success')
    t.string('code')
    t.string('message')
    t.string('error')
    t.int('photo')
  },
})

export interface DeleteOutput {
  success?: boolean
  code?: string
  message?: string
  error?: string
  photo?: number
}

export interface DeleteContactPhotoInput {
  id: number
}

export const uploadImage = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('uploadImage', {
      type: 'String',
      async resolve() {
        return ['a', 'b', 'c']
      },
    })
  },
})

export const DeleteContactAttachmentPhoto = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteContactAttachmentPhoto', {
      type: DeleteContactPhotoResponse,
      args: {
        id: intArg(),
      },
      resolve: async function (_, args: DeleteContactPhotoInput, ctx: Context) {
        const { id } = args

        try {
          const attachment = await ctx.prisma.contactAttachment.findFirst({
            where: {
              id: { equals: id },
              company_id: { equals: ctx.authenticated.company },
            },
            select: {
              linkref: true,
            },
          })

          const postData = new FormData()
          postData.append('file_path', attachment.linkref)

          const response = await fetch(
            'https://cdn.pabau.com/v2/api/contact/delete-photo',
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${ctx.authJwt}`,
              },
              redirect: 'follow',
              body: postData,
            }
          )

          const res: DeleteOutput = await response.json()

          if (res.success === true) {
            await ctx.prisma.contactAttachment.delete({
              where: {
                id: id,
              },
            })
          }

          return { ...res, photo: id } as DeleteOutput
        } catch {
          return { success: false, photo: id } as DeleteOutput
        }
      },
    })
  },
})

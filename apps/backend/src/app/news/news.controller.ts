import { Controller, Post, Body } from '@nestjs/common'
import { NewsService } from './news.service'

interface ResponseType {
  success: boolean
  message?: string | string[]
  response?: {
    id?: string
  }
}

interface BodyData {
  img: string
  link: string
  description: string
  title: string
}

const requiredFields = ['img', 'link', 'description', 'title']

@Controller()
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post('news')
  async sendNews(@Body() data: BodyData): Promise<ResponseType> {
    const errors: string[] = []
    requiredFields.map((key) => {
      if (!data[key]) {
        errors.push(`${key} is required`)
      }
    })

    if (errors.length > 0) {
      return { success: false, message: errors }
    }

    const response = await this.newsService.sendNews(
      data.img,
      data.link,
      data.description,
      data.title
    )
    return { success: true, response }
  }
}

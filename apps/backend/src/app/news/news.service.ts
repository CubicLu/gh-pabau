import { HttpService, Injectable } from '@nestjs/common'

@Injectable()
export class NewsService {
  constructor(private httpService: HttpService) {}
  async sendNews(
    img: string,
    link: string,
    description: string,
    title: string
  ): Promise<{ id?: string }> {
    const variables = {
      title,
      link,
      img,
      description,
    }
    const query =
      'mutation insert_product_news_one(\n  $title:  String\n  $link: String\n  $description: String\n  $img: String\n) {\n  insert_product_news_one(\n    object: { title: $title, link: $link, description: $description, img:$img }\n  ) {\n    id\n  }\n}'
    const operationName = 'insert_product_news_one'
    const data = {
      query,
      variables,
      operationName,
    }

    const response = await this.httpService
      .post(
        process.env.HASURA_GRAPHQL_ENDPOINT ||
          'https://api-v2.pabau.com/v1/graphql',
        data
      )
      .toPromise()
    return response?.data?.data?.insert_product_news_one
  }
}

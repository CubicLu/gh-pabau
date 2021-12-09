import fetch from 'node-fetch'
import { URLSearchParams } from 'node:url'
import { Context } from '../../context'

export default class ReportService {
  public constructor(private ctx: Context) {}

  /**
   * Fetches one report from php land
   */
  public async retrieve(params: URLSearchParams) {
    await fetch(`${this.ctx.authenticated.remote_url}/api/pabau2.php?${params}`)
      .then((result) => result.json())
      .catch((error) => {
        throw new Error(error)
      })
  }
}

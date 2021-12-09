import { Context } from '../../context'
import {
  SubscriptionCardDetailsOutput,
  SubscriptionDetailsOutput,
  SubscriptionQueryInputs,
} from './dto/subscription.dto'
import { SubscriptionInvoice } from './nexus-type'
import { SubscriptionService } from './subscription.service'
import { GoCardlessClient } from 'gocardless-nodejs/client'
import { Environments } from 'gocardless-nodejs/constants'
import { SubscriptionStatus } from 'gocardless-nodejs/types/Types'
import { URLSearchParams } from 'node:url'

export default class SubscriptionGoCardless extends SubscriptionService {
  client: GoCardlessClient
  public constructor(protected ctx: Context, protected client_id: string) {
    super(ctx, client_id)
  }

  public async build(): Promise<void> {
    console.info('Subscription gocardless is initialized')
    this.type = 'GoCardless'
    this.client = new GoCardlessClient(
      process.env.GOCARDLESS_ACCESS_TOKEN,
      Environments.Live,
      { raiseOnIdempotencyConflict: false }
    )
  }

  public async listSubscriptions(
    input: SubscriptionQueryInputs
  ): Promise<typeof SubscriptionInvoice[]> {
    const params: { [key: string]: string | number } = {
      customer: this.client_id,
    }

    if (input.status === 'PAID') {
      params['status'] = 'paid_out'
      input.status = ''
    }

    const invoices = []
    for await (const item of this.client.payments.all(params)) {
      if (
        (input.searchTerm &&
          !`${
            item.description +
            item.amount +
            item.id +
            item.charge_date +
            item.status
          }`
            .toLowerCase()
            .includes(input.searchTerm.toLowerCase())) ||
        (input.status && item.status === 'paid_out')
      ) {
        continue
      }
      const params = new URLSearchParams({
        compid: this.ctx.authenticated?.company.toString(),
        id: item.id.toString(),
        invnum: item.id.toString(),
      })
      invoices.push({
        ...item,
        invoice_link:
          item.status === 'paid_out'
            ? `${this.ctx.authenticated?.remote_url}/pages/contacts/gocardless.php?${params}`
            : null,
        amount: (Number(item.amount) / 100).toFixed(2),
        date: item.charge_date,
        status:
          item.status?.replace('_', ' ')[0].toUpperCase() +
          item.status?.replace('_', ' ').slice(1),
      })

      if (invoices.length >= input.limit + input.offset) break
    }
    return invoices.slice(input.offset, input.offset + input.limit)
  }

  public async countSubscriptions(input: SubscriptionQueryInputs) {
    let count = 0
    const params: { [key: string]: string } = {
      customer: this.client_id,
    }

    if (input.status === 'PAID') {
      params['status'] = 'paid_out'
      input.status = ''
    }

    for await (const item of this.client.payments.all(params)) {
      if (
        (input.searchTerm &&
          !`${
            item.description +
            item.amount +
            item.id +
            item.charge_date +
            item.status
          }`
            .toLowerCase()
            .includes(input.searchTerm.toLowerCase())) ||
        (input.status && item.status === 'paid_out')
      ) {
        continue
      }

      count++
    }

    return count
  }

  public async getDetails(): Promise<SubscriptionDetailsOutput> {
    const res = await this.client.subscriptions.list({
      customer: this.client_id,
      status: [SubscriptionStatus.Active],
    })
    const subscription = res.subscriptions[res.subscriptions.length - 1]

    return {
      id: subscription.id,
      created_at: new Date(subscription.created_at ?? ''),
      currency: subscription.currency,
      name: subscription.name,
      interval_unit: subscription.interval_unit,
      status: subscription.status,
      app_fee: subscription.app_fee ?? 0,
      next_charge_date: subscription.upcoming_payments[0]?.charge_date ?? '',
      next_charge_amount: subscription.upcoming_payments[0]?.amount
        ? Number(subscription.upcoming_payments[0]?.amount) / 100
        : 0,
      amount: subscription.amount ? Number(subscription.amount) / 100 : 0,
    }
  }

  public async getCardDetails(): Promise<SubscriptionCardDetailsOutput> {
    const res = await this.client.customerBankAccounts.list({
      customer: this.client_id,
    })
    const bank =
      res.customer_bank_accounts[res.customer_bank_accounts.length - 1]

    return {
      id: bank.id,
      created_at: new Date(bank.created_at ?? ''),
      currency: bank.currency,
      account_number_ending: bank.account_number_ending,
      bank_name: bank.bank_name,
      account_holder_name: bank.account_holder_name,
    }
  }
}

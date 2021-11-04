/* eslint-disable react-hooks/rules-of-hooks */

import { ConsentStep } from './Consent'
import { DetailsStep } from './Details'
import { ContractSelectionStep } from './ContractSelection'
import { PhotoStep } from './Photo'
import { PinScreenStep } from './PinScreen'
import { QuestionnaireStep } from './Questionnaire'
import { TreatmentStep } from './Treatment'
import { GetDetailsDocument, useGetDetailsQuery } from '@pabau/graphql'
import { ApolloClient } from '@apollo/client'

export default {
  consent: {
    component: ConsentStep,
  },
  'contract-selection': {
    component: ContractSelectionStep,
  },
  details: {
    component: DetailsStep,
    load: (
      client,
      {
        contact_id,
      }: {
        contact_id?: number
      }
    ) =>
      client.query({
        query: GetDetailsDocument,
        variables: { contactId: contact_id },
      }),
  },
  photo: {
    component: PhotoStep,
  },
  pinscreen: {
    component: PinScreenStep,
  },
  questionnaire: {
    component: QuestionnaireStep,
    load: (
      client,
      {
        contact_id,
      }: {
        contact_id?: number
      }
    ) =>
      client.query({
        query: GetDetailsDocument,
        variables: { contactId: contact_id },
      }),
  },
  treatment: {
    component: TreatmentStep,
  },
}

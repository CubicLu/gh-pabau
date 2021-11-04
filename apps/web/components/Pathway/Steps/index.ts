import { ConsentStep } from './Consent'
import { DetailsStep } from './Details'
import { ContractSelectionStep } from './ContractSelection'
import { PhotoStep } from './Photo'
import { PinScreenStep } from './PinScreen'
import { QuestionnaireStep } from './Questionnaire'
import { TreatmentStep } from './Treatment'

export default {
  consent: ConsentStep,
  'contract-selection': ContractSelectionStep,
  details: DetailsStep,
  photo: PhotoStep,
  pinscreen: PinScreenStep,
  questionnaire: QuestionnaireStep,
  treatment: TreatmentStep,
  //TODO: add remaining steps
}

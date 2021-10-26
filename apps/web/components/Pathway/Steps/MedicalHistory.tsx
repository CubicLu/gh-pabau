import { Field, Form, Formik } from 'formik'

interface FormProps {
  allergies: string
}

interface P {
  onSubmit(data: FormProps & P['data']): void // This must be present for each Step
  data?: Record<string, any> // This must be present for each Step
}

export const MedicalHistoryStep = ({ onSubmit, data }: P) => (
  <>
    <h2>Medical History</h2>
    <h3>{JSON.stringify(data)}</h3>
    <Formik
      initialValues={data} // Set this to {data} if you want full default remembering
      validate={(values) => {
        const errors = {} as any
        if (!values.someValue) {
          errors.someValue = 'Required'
        }
        return errors
      }}
      onSubmit={(values) => onSubmit?.({ ...data, ...values })}
    >
      {({ errors, touched }) => (
        <Form>
          {errors && (
            <ul>
              {Object.entries(errors).map(([key, value]) => (
                <li key={key}>{`${key}: ${value}`}</li>
              ))}
            </ul>
          )}
          <Field name="someValue" placeholder="Some Value" />
          <input type="submit" disabled={!touched} />
        </Form>
      )}
    </Formik>
  </>
)

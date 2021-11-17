import { Field, Form, Formik } from 'formik'

interface FormProps {
  consent: boolean
}

interface P {
  onSubmit(data: FormProps): void // This must be present for each Step
  data?: Record<string, any> // This must be present for each Step
}

export const PhotoStep = ({ onSubmit, data }: P) => (
  <div style={{ backgroundColor: data.pin_user_id ? 'red' : 'white' }}>
    <h2>Photos</h2>
    <h3>{JSON.stringify(data)}</h3>
    <Formik
      initialValues={{ consent: false }}
      validate={(values) => {
        const errors = {} as any
        if (!values.consent) {
          errors.consent = 'Required to be ticked'
        }
        return errors
      }}
      onSubmit={(values) => onSubmit?.(values)}
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
          <Field type="checkbox" name="consent" />
          <input type="submit" disabled={!touched} />
        </Form>
      )}
    </Formik>
  </div>
)

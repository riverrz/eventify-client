import { useCallback } from "react";
import { Formik, Field } from "formik";
import styled from "styled-components";
import TagsInput from "react-tagsinput";
import cogoToast from "cogo-toast";
import Button from "components/Button";
import { emailRegex } from "lib/validations/regex";

const CreateEvent = ({ className }) => {
  const validationErrorMessage = useCallback(
    () => cogoToast.error("Please enter a valid email"),
    []
  );
  return (
    <main className={className}>
      <h2>Create an event</h2>
      <Formik
        initialValues={{
          title: "",
          description: "",
          totalParticipantsAllowed: 0,
          startTimeStamp: "",
          endTimeStamp: "",
          emailsArr: []
        }}
        onSubmit={values => {
          console.log(values);
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit} className="form">
            <Field
              name="title"
              className="input-field"
              placeholder="Enter title of your event"
              required
            />
            <Field
              name="description"
              className="input-field"
              placeholder="Enter description of your event"
              required
            />
            <Field
              type="number"
              className="input-field"
              name="totalParticipantsAllowed"
              required
            />
            <Field
              type="date"
              className="input-field"
              name="startTimeStamp"
              required
            />
            <Field
              type="date"
              className="input-field"
              name="endTimeStamp"
              required
            />
            <Field name="emailsArr">
              {({ field, form }) => (
                <TagsInput
                  value={field.value}
                  onlyUnique
                  validationRegex={emailRegex}
                  inputProps={{
                    placeholder: "Enter participants' email addresses"
                  }}
                  onValidationReject={validationErrorMessage}
                  onChange={x => form.setFieldValue("emailsArr", x)}
                />
              )}
            </Field>
            <Button type="submit">Submit</Button>
          </form>
        )}
      </Formik>
    </main>
  );
};

export default styled(CreateEvent)`
  .form {
    width: 50%;
    margin: 2rem auto;
    text-align: center;

    .input-field,
    .react-tagsinput {
      margin: 2rem 0;
      font-size: inherit;
      padding: 1rem 2rem;
      display: block;
      width: 100%;
    }
    .react-tagsinput-input {
      font-size: 1rem;
      width: 65%;
    }
  }
`;

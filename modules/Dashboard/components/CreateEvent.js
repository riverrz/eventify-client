import { useCallback } from "react";
import { connect } from "react-redux";
import { Formik, Field } from "formik";
import styled from "styled-components";
import TagsInput from "react-tagsinput";
import cogoToast from "cogo-toast";
import { createStructuredSelector } from "reselect";
import { pick, path } from "ramda";
import { bindActionCreators } from "redux";
import * as actions from "modules/Dashboard/redux/actions";
import Button from "components/Button";
import Spinner from "components/Spinner";
import { emailRegex } from "lib/validations/regex";

const CreateEvent = ({ className, createEventRequest, loading }) => {
  const validationErrorMessage = useCallback(
    () => cogoToast.error("Please enter a valid email"),
    []
  );
  return (
    <main className={className}>
      <h2>Create an event</h2>
      {!loading && (
        <Formik
          initialValues={{
            title: "",
            description: "",
            totalParticipantsAllowed: 0,
            startTimeStamp: "",
            endTimeStamp: "",
            emailArr: []
          }}
          onSubmit={(values, { resetForm }) => {
            createEventRequest(values);
            resetForm();
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
              <Field name="emailArr" required>
                {({ field, form }) => (
                  <TagsInput
                    value={field.value}
                    onlyUnique
                    validationRegex={emailRegex}
                    inputProps={{
                      placeholder: "Enter participants' email addresses"
                    }}
                    onValidationReject={validationErrorMessage}
                    onChange={x => form.setFieldValue("emailArr", x)}
                  />
                )}
              </Field>
              <Button type="submit">Submit</Button>
            </form>
          )}
        </Formik>
      )}
      {loading && (
        <Spinner />
      )}
    </main>
  );
};

const StyledCreateEvent = styled(CreateEvent)`
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

const mapStateToProps = createStructuredSelector({
  loading: path(["dashboard", "createEvent", "loading"])
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(pick(["createEventRequest"], actions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StyledCreateEvent);
import { useCallback, useMemo } from "react";
import { Formik, Field } from "formik";
import Files from "react-butterfiles";
import TagsInput from "react-tagsinput";
import cogoToast from "cogo-toast";
import { isEmpty } from "ramda";
import Button from "components/Button";
import { ResponsiveFlex } from "components/Flex";
import { emailRegex } from "lib/validations/regex";
import theme from "theme";

const defaultInitialValues = {
  title: "",
  description: "",
  totalParticipantsAllowed: "",
  startTimeStamp: "",
  endTimeStamp: "",
  emailArr: [],
  banner: {},
  duration: "",
  participationFees: "",
};

export default function ({ submitHandler, open, next, initialValues = {} }) {
  if (!open) {
    return null;
  }
  const validationErrorMessage = useCallback(
    () => cogoToast.error("Please enter a valid email"),
    []
  );
  const initValues = useMemo(
    () => ({ ...defaultInitialValues, ...initialValues }),
    [initialValues]
  );
  return (
    <Formik
      initialValues={initValues}
      onSubmit={(values) => {
        submitHandler(values);
        next();
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit} className="form" autoComplete="off">
          <div className="field-container">
            <label htmlFor="title">Enter title of your event*</label>
            <Field id="title" name="title" className="input-field" required />
          </div>
          <div className="field-container">
            <label htmlFor="description">
              Enter description of your event*
            </label>
            <Field
              id="description"
              name="description"
              className="input-field"
              required
            />
          </div>
          <div className="field-container">
            <label htmlFor="participationFees">
              Enter the participation fees for the event*
            </label>
            <Field
              type="number"
              name="participationFees"
              className="input-field"
              required
            />
          </div>
          <div className="field-container">
            <label htmlFor="totalParticipantsAllowed">
              Enter number of participants (atleast 1)*
            </label>
            <Field
              type="number"
              className="input-field"
              name="totalParticipantsAllowed"
              required
            />
          </div>
          <div className="field-container">
            <label htmlFor="startTimeStamp">
              Enter the start timestamp for the event*
            </label>
            <Field
              type="datetime-local"
              className="input-field"
              name="startTimeStamp"
              required
            />
          </div>
          <div className="field-container">
            <label htmlFor="endTimeStamp">
              Enter the end timestamp for the event*
            </label>
            <Field
              type="datetime-local"
              className="input-field"
              name="endTimeStamp"
              required
            />
          </div>
          <div className="field-container">
            <label htmlFor="duration">
              Enter duration of the event in minutes*
            </label>
            <Field name="duration" type="number" className="input-field" />
          </div>
          <div className="field-container">
            <label htmlFor="emailArr">Enter the email of participants*</label>
            <Field name="emailArr" required>
              {({ field, form }) => (
                <TagsInput
                  value={field.value}
                  onlyUnique
                  validationRegex={emailRegex}
                  inputProps={{
                    placeholder: "Enter participants' email addresses*",
                  }}
                  onValidationReject={validationErrorMessage}
                  onChange={(x) => form.setFieldValue("emailArr", x)}
                />
              )}
            </Field>
          </div>
          <Field name="banner" required>
            {({ field, form }) => (
              <Files
                multiple={false}
                maxSize="2mb"
                accept={["image/jpg", "image/jpeg"]}
                onSuccess={([banner]) => form.setFieldValue("banner", banner)}
                onError={(errors) => console.log(errors)}
              >
                {({ browseFiles, getDropZoneProps, getLabelProps }) => (
                  <>
                    <label className="upload" {...getLabelProps()}>
                      Upload a banner
                    </label>
                    <ResponsiveFlex width="1120px" justify="space-around">
                      <span {...getDropZoneProps({ className: "drop-zone" })}>
                        Drop your banner here...
                      </span>
                      <span className="divider"> OR </span>
                      <Button
                        backgroundColor={theme.primaryDark}
                        type="button"
                        onClick={browseFiles}
                      >
                        Select a banner
                      </Button>
                      <ol>
                        {!isEmpty(field.value) && (
                          <li key={field.value.name}>{field.value.name}</li>
                        )}
                      </ol>
                    </ResponsiveFlex>
                  </>
                )}
              </Files>
            )}
          </Field>
          <Button type="submit">Next</Button>
        </form>
      )}
    </Formik>
  );
}

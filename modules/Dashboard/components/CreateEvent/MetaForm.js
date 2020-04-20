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
        <form onSubmit={props.handleSubmit} className="form">
          <Field
            name="title"
            className="input-field"
            placeholder="*Enter title of your event"
            required
          />
          <Field
            name="description"
            className="input-field"
            placeholder="*Enter description of your event"
            required
          />
          <Field
            type="number"
            className="input-field"
            name="totalParticipantsAllowed"
            placeholder="*Enter number of participants (atleast 1)"
            required
          />
          <Field
            type="datetime-local"
            className="input-field"
            name="startTimeStamp"
            required
          />
          <Field
            type="datetime-local"
            className="input-field"
            name="endTimeStamp"
            required
          />
          <Field
            name="duration"
            type="number"
            className="input-field"
            placeholder="Enter duration of the event in minutes"
          />
          <Field name="emailArr" required>
            {({ field, form }) => (
              <TagsInput
                value={field.value}
                onlyUnique
                validationRegex={emailRegex}
                inputProps={{
                  placeholder: "*Enter participants' email addresses",
                }}
                onValidationReject={validationErrorMessage}
                onChange={(x) => form.setFieldValue("emailArr", x)}
              />
            )}
          </Field>
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

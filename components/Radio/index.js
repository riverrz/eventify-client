import { Field } from "formik";

export default function Radio(props) {
  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <label>
          <input
            type="radio"
            {...props}
            checked={field.value.includes(props.value)}
            onChange={() => {
              if (!field.value.includes(props.value)) {
                form.setFieldValue(props.name, [props.value]);
              }
            }}
          />
          {props.value}
        </label>
      )}
    </Field>
  );
}

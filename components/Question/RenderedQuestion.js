import styled from "styled-components";
import { Formik, Field } from "formik";
import Flex from "components/Flex";
import Button from "components/Button";
import { Checkbox, CheckboxGroup } from "components/Checkbox";

function RenderedQuestion({
  className,
  data,
  step,
  move,
  save,
  initialValues = {},
  isLastQuestion,
}) {
  const { question, type, choices } = data;

  return (
    <div className={className}>
      <div
        className="question"
        dangerouslySetInnerHTML={{ __html: `Q${step}. ${question}` }}
      />
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          save({ type, step, values });
        }}
        enableReinitialize
      >
        {(formikProps) => (
          <form onSubmit={formikProps.handleSubmit} className="form">
            <Choices type={type} choices={choices} formikProps={formikProps} />
            <Button type="submit">Save</Button>
          </form>
        )}
      </Formik>
      <Flex justify="space-around" className="actions">
        {step > 1 && <Button onClick={() => move(step - 1)}>Back</Button>}
        <Button
          onClick={() => {
            move(step + 1);
          }}
        >
          {isLastQuestion ? "Submit" : "Next"}
        </Button>
      </Flex>
    </div>
  );
}

function Choices({ type, choices, formikProps }) {
  switch (type) {
    case "Text field": {
      return <Field name="answer" required placeholer="Enter your answer" />;
    }
    default: {
      const { values, setFieldValue } = formikProps;
      return (
        <CheckboxGroup
          id="answer"
          value={values.answer || []}
          onChange={setFieldValue}
        >
          {choices.map((choice, i) => (
            <Field
              component={Checkbox}
              name="answer"
              id={`checkbox${i + 1}`}
              label={choice}
            />
          ))}
        </CheckboxGroup>
      );
    }
  }
}

export default styled(RenderedQuestion)`
  margin: 2rem 0;
  padding: 1rem;
  background-color: #eee;
  .question {
    margin-bottom: 2rem;
  }
  .actions {
    margin: 1rem 0;
  }
`;

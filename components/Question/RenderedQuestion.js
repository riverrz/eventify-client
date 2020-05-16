import { Component } from "react";
import { equals } from "ramda";
import styled from "styled-components";
import { Formik, Field, Form } from "formik";
import Flex from "components/Flex";
import Button from "components/Button";
import Choices from "components/Choices";

function RenderedQuestion({
  className,
  data,
  step,
  move,
  save,
  initialValues,
}) {
  const { question, type, choices } = data;

  return (
    <div className={className}>
      <div
        className="question"
        dangerouslySetInnerHTML={{ __html: `Q${step}. ${question}` }}
      />

      <Formik initialValues={initialValues} enableReinitialize>
        {(formikProps) => (
          <Form>
            {type === "Text field" ? (
              <Field
                type="text"
                name="answer"
                required
                placeholder="Enter your answer here"
              />
            ) : (
              <Choices type={type} choices={choices} />
            )}
            <FormOnChange values={formikProps.values} save={save} />
          </Form>
        )}
      </Formik>

      <Flex justify="space-around" className="actions">
        {step > 1 && <Button onClick={() => move(step - 1)}>Back</Button>}
        <Button
          onClick={() => {
            move(step + 1);
          }}
        >
          Next
        </Button>
      </Flex>
    </div>
  );
}

class FormOnChange extends Component {
  shouldComponentUpdate(nextProps) {
    if (equals(nextProps.values, this.props.values)) {
      return false;
    }
    return true;
  }
  componentDidUpdate() {
    const { values, save } = this.props;
    if (values) {
      save(values);
    }
  }
  render() {
    return null;
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

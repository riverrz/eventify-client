import { Component } from "react";
import { equals } from "ramda";
import styled from "styled-components";
import { Formik, Field, Form } from "formik";
import Flex from "components/Flex";
import Button from "components/Button";
import Choices from "components/Choices";
import theme from "theme";

function RenderedQuestion({
  className,
  data,
  step,
  move,
  save,
  initialValues,
}) {
  const { question, type, choices, marks = 100 } = data;

  return (
    <div className={className}>
      <Flex justify="space-between" className="header">
        <h3>Question. {step}</h3>
        <h4>
          Maximum Marks: <span className="marks">{marks}</span>
        </h4>
      </Flex>
      <div
        className="question"
        dangerouslySetInnerHTML={{ __html: question }}
      />

      <Formik initialValues={initialValues} enableReinitialize>
        {(formikProps) => (
          <Form className="form">
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
  background-color: #fff;
  .header {
    border-bottom: 1px solid #ccc;
    padding: 0.5rem 1rem;
    h3,
    h4 {
      margin: 0;
    }
    .marks {
      color: ${theme.primaryGreen};
    }
  }
  .question {
    margin-bottom: 2rem;
    padding: 1rem;
  }
  .form input[type=text] {
    display: block;
    width: 75%;
    margin: 1rem auto;
    font-size: inherit;
    padding: 1rem 2rem;
  }
  .actions {
    padding: 1rem 0;
  }
`;

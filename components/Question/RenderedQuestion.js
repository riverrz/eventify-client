import styled from "styled-components";
import { Formik, Field } from "formik";

function RenderedQuestion({ className, data, qNo }) {
  const { question, type, choices } = data;
  return (
    <div className={className}>
      <div
        className="question"
        dangerouslySetInnerHTML={{ __html: `Q${qNo}. ${question}` }}
      />
      <Choices type={type} choices={choices} />
    </div>
  );
}

function Choices({ type, choices }) {
  if (type == "Text field") {
    return <input type="text" />;
  } else {
    return choices.map((choice) => {
      return (
        <>
          <input type="checkbox" name="" id="" />
          <label htmlFor="">{choice}</label>
        </>
      );
    });
  }
}

export default styled(RenderedQuestion)`
  margin: 2rem 0;
  padding: 1rem;
  background-color: #eee;
  .question {
    margin-bottom: 1rem;
  }
`;

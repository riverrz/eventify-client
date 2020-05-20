import { useState, useCallback, useRef, Fragment } from "react";
import styled from "styled-components";
import Question from "components/Question";
import Button from "components/Button";

const Contentful = ({ className, submitHandler, open, createEvent }) => {
  if (!open) {
    return null;
  }
  const inputRef = useRef(null);
  const [content, setContent] = useState({});
  const [noOfQuestions, setNoOfQuestions] = useState(null);
  return (
    <div className={className}>
      {!Boolean(noOfQuestions) && (
        <form
          className="form"
          onSubmit={() => setNoOfQuestions(Number(inputRef.current.value))}
        >
          <div className="field-container">
            <label htmlFor="noOfQuestions">Enter number of questions</label>
            <input
              ref={inputRef}
              type="text"
              name="noOfQuestions"
              className="input-field"
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      )}
      {Boolean(noOfQuestions) && (
        <Fragment>
          {[...Array(noOfQuestions)].map((_, i) => {
            return (
              <Question
                key={i}
                index={i + 1}
                submitValues={(values) =>
                  setContent({ ...content, [i + 1]: values })
                }
              />
            );
          })}
          <Button
            onClick={() => {
              submitHandler({ content });
              createEvent();
            }}
          >
            Create
          </Button>
        </Fragment>
      )}
    </div>
  );
};

export default styled(Contentful)`
  text-align: center;
  button {
    margin: 2rem 0;
  }
`;

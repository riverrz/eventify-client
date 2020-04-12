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
          <input
            ref={inputRef}
            type="text"
            name="noOfQuestions"
            placeholder="Enter number of questions"
          />
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
  text-align: middle;
  .form input {
    display: block;
    width: 75%;
    margin: auto;
    font-size: inherit;
    padding: 1rem 2rem;
  }
  button {
    margin: 2rem 0;
  }
`;

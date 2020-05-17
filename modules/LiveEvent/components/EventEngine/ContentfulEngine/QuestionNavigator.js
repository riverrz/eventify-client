import styled from "styled-components";
import Flex from "components/Flex";

function QuestionNavigator({ className, blob, current, savedData }) {
  if (!blob) {
    return null;
  }
  const attemptedQuestions = Object.keys(savedData);
  return (
    <div className={className}>
      <Flex className="container" wrap="wrap" justify="space-evenly">
        {Object.keys(blob).map((qNo) => {
          const classNames = ["circle"];
          if (current.toString() === qNo.toString()) {
            classNames.push("circle--current");
          }
          if (attemptedQuestions.includes(qNo.toString())) {
            classNames.push("circle--answered");
          }
          return (
            <div key={qNo} className={classNames.join(" ")}>
              {qNo}
            </div>
          );
        })}
      </Flex>
      <div className="legends">
        <div className="legend">
          <span className="circle circle--answered"></span>{" "}
          <span>You have answered this question</span>
        </div>
        <div className="legend">
          <span className="circle circle--current"></span>{" "}
          <span>You are currently on this question</span>
        </div>
      </div>
    </div>
  );
}

export default styled(QuestionNavigator)`
  .container {
    padding: 2rem 1rem;
    border-bottom: 1px solid #ccc;
  }
  .circle {
    border-radius: 50%;
    padding: 0.7rem 1rem;
    border: 1px solid #eee;

    &--answered {
      background-color: #7cfc00;
    }
    &--current {
      background-color: #ff7f50;
    }
  }
  .legends {
    font-size: 0.8rem;
    padding: 1rem 0.2rem;
    .legend {
      margin: 0.5rem;
    }
    .circle {
      padding: 1px 8px;
      margin-right: 5px; 0.5rem
    }
  }
`;

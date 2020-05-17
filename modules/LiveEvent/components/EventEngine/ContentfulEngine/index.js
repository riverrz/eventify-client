import { withRouter } from "next/router";
import styled from "styled-components";
import { Component } from "react";
import Timer from "components/Timer";
import RenderedQuestion from "components/Question/RenderedQuestion";
import Flex from "components/Flex";
import Button from "components/Button";
import theme from "theme";
import QuestionNavigator from "./QuestionNavigator";

class ContentfulEngine extends Component {
  state = {
    data: {},
    step: 1,
  };

  finishHandler = () => {
    // event finished
    const { type, eventId } = this.props.event;
    this.props.endEvent({
      type,
      eventId,
      replies: this.state.data,
    });
    this.props.router.push("/");
  };
  move = (step) => {
    this.setState({
      step,
    });
  };
  save = ({ answer, qNo }) => {
    // answer = string[] || string
    const data = { ...this.state.data, [qNo]: answer };
    this.setState({ data });
  };
  render() {
    const {
      className,
      blob,
      totalQuestions,
      event: { title },
    } = this.props;
    const { step } = this.state;
    return (
      <main className={className}>
        <div className="heading-container">
          <h2>{title}</h2>
          <div className="timer">
            <Timer onFinish={this.finishHandler} />
          </div>
        </div>
        <Flex className="container" justify="space-evenly" align="flex-start">
          <div className="first">
            {step <= totalQuestions && (
              <RenderedQuestion
                data={blob[step]}
                initialValues={{
                  answer: this.state.data[step] || [],
                  qNo: step,
                }}
                move={this.move}
                step={step}
                save={this.save}
              />
            )}
            {step > totalQuestions && (
              <div>
                <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
                  You have answer all the questions! Would you like to submit?
                </h3>
                <Flex justify="space-evenly">
                  <Button onClick={() => this.move(totalQuestions)}>
                    Back
                  </Button>
                  <Button onClick={this.finishHandler}>Submit</Button>
                </Flex>
              </div>
            )}
          </div>
          <div className="second">
            <div className="summary">
              <h3>Summary</h3>
            </div>
            <QuestionNavigator
              current={step}
              savedData={this.state.data}
              blob={blob}
            />
          </div>
        </Flex>
      </main>
    );
  }
}

const StyledContentfulEngine = styled(ContentfulEngine)`
  h2,
  h3 {
    margin: 0;
  }
  height: 100%;
  padding: 1rem;
  background-color: #eee;
  .heading-container {
    background-color: #fff;
    margin: 0.5rem 0;
    padding: 1rem;
    position: relative;
    h2 {
      color: ${theme.primaryGreen};
    }
  }
  .container {
    padding: 2rem 0;
    .first {
      flex: 3;
      margin-right: 0.5rem;
    }
    .second {
      background-color: #fff;
      flex: 1;
      margin-left: 0.5rem;
    }

    .summary {
      border-bottom: 1px solid #ccc;
      padding: 0.5rem 1rem;
      text-align: center;
    }
  }
  .timer {
    position: absolute;
    top: 0;
    right: 3%;
  }
`;

export default withRouter(StyledContentfulEngine);

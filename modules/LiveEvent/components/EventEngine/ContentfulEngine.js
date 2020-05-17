import { withRouter } from "next/router";
import styled from "styled-components";
import { Component } from "react";
import Timer from "components/Timer";
import RenderedQuestion from "components/Question/RenderedQuestion";
import Flex from "components/Flex";
import Button from "components/Button";
import theme from "theme";

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
        <div className="container">
          {step <= totalQuestions && (
            <RenderedQuestion
              data={blob[step]}
              initialValues={{ answer: this.state.data[step] || [], qNo: step }}
              move={this.move}
              step={step}
              save={this.save}
            />
          )}
          {step > totalQuestions && (
            <div>
              <h3 style={{ textAlign: "center" }}>
                You have answer all the questions! Would you like to submit?
              </h3>
              <Flex justify="space-evenly">
                <Button onClick={() => this.move(totalQuestions)}>Back</Button>
                <Button onClick={this.finishHandler}>Submit</Button>
              </Flex>
            </div>
          )}
        </div>
      </main>
    );
  }
}

const StyledContentfulEngine = styled(ContentfulEngine)`
  height: 100%;
  padding: 1rem;
  background-color: #eee;
  .heading-container {
    background-color: #fff;
    margin: 0.5rem 0;
    padding: 0.5rem 1rem;
    h2 {
      color: ${theme.primaryGreen};
      margin: 0;
    }
  }
  .container {
    position: relative;
  }
  .timer {
    position: absolute;
    top: 0;
    right: 3%;
  }
`;

export default withRouter(StyledContentfulEngine);

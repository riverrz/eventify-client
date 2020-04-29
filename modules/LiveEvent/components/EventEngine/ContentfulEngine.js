import styled from "styled-components";
import { Component } from "react";
import { pick } from "ramda";
import Timer from "components/Timer";
import RenderedQuestion from "components/Question/RenderedQuestion";
import { withRouter } from "next/router";

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
  componentDidUpdate() {
    const { totalQuestions } = this.props;
    if (this.state.step > totalQuestions && totalQuestions > 0) {
      this.finishHandler();
    }
  }
  save = ({ values, step, type }) => {
    let newValues;
    if (type === "Text field") {
      newValues = { values, type };
    } else {
      newValues = { ...values, type };
    }
    const data = { ...this.state.data, [step]: newValues };
    this.setState({
      data,
    });
  };
  render() {
    const { className, blob, totalQuestions } = this.props;
    const { step } = this.state;
    return (
      <main className={className}>
        <div className="timer">
          <Timer onFinish={this.finishHandler} />
        </div>
        <div className="container">
          {step <= totalQuestions && (
            <RenderedQuestion
              data={blob[step]}
              initialValues={
                this.state.data[step] && pick(["answer"], this.state.data[step])
              }
              move={this.move}
              step={step}
              save={this.save}
              isLastQuestion={step === totalQuestions}
            />
          )}
        </div>
      </main>
    );
  }
}

const StyledContentfulEngine = styled(ContentfulEngine)`
  position: relative;
  height: 100%;
  padding-top: 2rem;
  .timer {
    position: absolute;
    top: 0;
    right: 3%;
  }
`;

export default withRouter(StyledContentfulEngine);

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
  };
  move = (step) => {
    this.setState({
      step,
    });
  };
  componentDidUpdate() {
    if (this.state.step > Object.keys(this.props.blob).length) {
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
    const { className, blob } = this.props;
    const { step } = this.state;
    const totalQuestions = blob && Object.keys(blob).length;
    return (
      <main className={className}>
        <div className="timer">
          <Timer onFinish={this.finishHandler} />
        </div>
        <div className="container">
          {blob && step <= totalQuestions && (
            <RenderedQuestion
              data={blob[step]}
              initialValues={
                this.state.data[step] && pick(["answer"], this.state.data[step])
              }
              move={this.move}
              step={step}
              save={this.save}
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

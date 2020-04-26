import styled from "styled-components";
import { Component } from "react";
import Timer from "components/Timer";
import RenderedQuestion from "components/Question/RenderedQuestion";

class ContentfulEngine extends Component {
  state = {
    data: {},
  };
  finishHandler = () => {
    // event finished
    this.props.endEvent();
  };
  render() {
    const { className, blob } = this.props;
    return (
      <main className={className}>
        <div className="timer">
          <Timer onFinish={this.finishHandler} />
        </div>
        <div className="container">
          {blob &&
            Object.entries(blob).map(([qNo, meta]) => {
              return <RenderedQuestion key={qNo} data={meta} qNo={qNo} />;
            })}
        </div>
      </main>
    );
  }
}

export default styled(ContentfulEngine)`
  position: relative;
  height: 100%;
  .timer {
    position: absolute;
    top: 0;
    right: 3%;
  }
`;

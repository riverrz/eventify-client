import styled from "styled-components";
import { Component } from "react";
import Timer from "components/Timer";

class ContentfulEngine extends Component {
  state = {
    data: {},
  };
  render() {
    const { className } = this.props;
    return (
      <main className={className}>
        <div className="timer">
          <Timer />
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

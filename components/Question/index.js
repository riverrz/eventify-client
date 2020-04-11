import { Component } from "react";
import styled from "styled-components";
import JoditEditor from "jodit-react";
import debounce from "lodash.debounce";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      config: {
        readonly: false,
      },
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.content !== nextState.content) {
      return true;
    }
    return false;
  }
  componentDidUpdate() {
    this.props.submitValues(this.state.content);
  }
  render() {
    const { index, className, config } = this.props;

    return (
      <div className={className}>
        <h2>Question {index}: </h2>
        <JoditEditor
          value={this.state.content}
          config={config}
          tabIndex={1}
          onChange={debounce((content) => {
            this.setState({ content });
          }, 200)}
        />
      </div>
    );
  }
}

export default styled(Question)`
  text-align: left;
`;

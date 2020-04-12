import { Component } from "react";
import styled from "styled-components";
import JoditEditor from "jodit-react";
import Icon from "react-icons-kit";
import { times } from "react-icons-kit/fa/times";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: {
        question: "",
        type: "",
        choices: ["", "", "", ""],
      },
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
  choiceHandler = (value, index) => {
    const newChoices = [...this.state.content.choices];
    newChoices[index] = value;
    this.setState({ content: { ...this.state.content, choices: newChoices } });
  };
  typeHandler = (value) => {
    let newChoices = [...this.state.content.choices];
    if (value === "Text field") {
      newChoices = [];
    } else if (newChoices.length === 0) {
      newChoices = Array(4).fill("");
    }
    this.setState({
      content: {
        ...this.state.content,
        type: value,
        choices: newChoices,
      },
    });
  };
  removeChoiceHandler = (index) => {
    const newChoices = this.state.content.choices.filter((_, i) => i !== index);
    this.setState({
      content: {
        ...this.state.content,
        choices: newChoices,
      },
    });
  };
  addChoice = () => {
    const newChoices = [...this.state.content.choices];
    newChoices.push("");
    this.setState({
      content: {
        ...this.state.content,
        choices: newChoices,
      },
    });
  };
  handleJoditValues = (content) => {
    this.setState({
      content: {
        ...this.state.content,
        question: content,
      },
    });
  };
  render() {
    const { index, className, config } = this.props;
    const { choices, type } = this.state.content;
    const displayChoices = ["Single Choice", "Multi Choice"].includes(type);
    return (
      <div className={className}>
        <h2>Question {index}: </h2>
        <JoditEditor
          value={this.state.content.question}
          config={config}
          tabIndex={1}
          onBlur={this.handleJoditValues}
        />
        <h2>Options (Please pick a choice for each option): </h2>
        <div className="choice-container">
          <span>Select the type of question</span>
          <select
            defaultValue=""
            onChange={(e) => this.typeHandler(e.target.value)}
          >
            <option value="" disabled>
              Select a type
            </option>
            <option value="Single Choice">Single Choice</option>
            <option value="Multi Choice">Multi Choice</option>
            <option value="Text field">Text field</option>
          </select>
        </div>
        {displayChoices &&
          choices.map((choice, i) => (
            <div key={i} className="choice-container">
              <span>{i + 1}). </span>
              <input
                value={choice}
                onChange={(e) => this.choiceHandler(e.target.value, i)}
                type="text"
                name={`${index}-option__${i}`}
                placeholder="Enter the choice here"
              />
              <Icon icon={times} onClick={() => this.removeChoiceHandler(i)} />
            </div>
          ))}
        {displayChoices && (
          <button onClick={this.addChoice}>Add a choice</button>
        )}
      </div>
    );
  }
}

export default styled(Question)`
  text-align: left;
  :not(:last-of-type) {
    border-bottom: 1px solid #222;
    margin-bottom: 2rem;
  }
  .choice-container {
    margin: 2rem;
    span {
      margin-right: 10px;
    }
    input {
      display: inline-block;
      width: 60%;
      padding: 0.5rem 2rem;
    }
  }
`;
